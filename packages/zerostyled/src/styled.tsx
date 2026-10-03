import * as React from "react";
import { hash } from "./hash.js";
import { resolve, hoistKeyframes, ZS, type Interpolation } from "./css.js";

/* ----------------------------------------------------------------------------
 * How it works
 * Every styled component renders its CSS as
 *   <style href={className} precedence="zs">.className{...}</style>
 * React 19 hoists these tags into <head>, de-duplicates them by href, and
 * handles streaming SSR. So there is no registry, no compiler and no
 * "use client". Native CSS nesting handles &:hover, @media, etc.
 * -------------------------------------------------------------------------- */

type VariantMap = Record<string, Record<string, string>>;

interface VariantStyle {
  cls: string;
  css: string;
}

interface Layer {
  cls: string;
  css: string;
  variants: Record<string, Record<string, VariantStyle>>;
  defaults: Record<string, string>;
}

interface StyledMeta {
  tag: React.ElementType;
  layers: Layer[];
  selector: string;
  variantKeys: Set<string>;
}

/* ------------------------------- Types ---------------------------------- */

type BoolKey<K> = K extends "true" | "false" ? boolean : K;

export type VariantProps<V extends VariantMap> = {
  [K in keyof V]?: BoolKey<keyof V[K]> | null;
};

export interface StyledConfig<V extends VariantMap> {
  /** Base styles, applied always. */
  base?: string;
  /** Named variants: { size: { sm: "...", lg: "..." } } */
  variants?: V;
  /** Variant values used when the prop is not passed. */
  defaultVariants?: { [K in keyof V]?: BoolKey<keyof V[K]> };
}

type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>;

export type StyledComponent<T extends React.ElementType, P = {}> = {
  /** `as` swaps the rendered element and its prop types: <Button as="a" href="/"> */
  <As extends React.ElementType = T>(
    props: { as?: As } & Omit<PropsOf<As>, keyof P | "as"> & P
  ): React.ReactElement;
  displayName?: string;
  readonly [ZS]: StyledMeta;
};

export interface StyledFactory<T extends React.ElementType, Inherited = {}> {
  (strings: TemplateStringsArray, ...values: Interpolation[]): StyledComponent<T, Inherited>;
  <V extends VariantMap>(config: StyledConfig<V>): StyledComponent<T, Inherited & VariantProps<V>>;
}

type Intrinsic = keyof React.JSX.IntrinsicElements;

type ExtractTag<C> =
  C extends StyledComponent<infer T extends React.ElementType, any>
    ? T
    : C extends React.ElementType
      ? C
      : never;
type ExtractProps<C> = C extends StyledComponent<any, infer P> ? P : {};

/* ----------------------------- Internals -------------------------------- */

const PRECEDENCE = "zs";

function isStyled(value: unknown): value is { [ZS]: StyledMeta } {
  return (
    value != null && (typeof value === "function" || typeof value === "object") && ZS in (value as object)
  );
}

/**
 * Each extension layer gets higher specificity than the one below it, and
 * each variant is one step above its own base. This makes overrides work
 * regardless of the order React inserts the <style> tags.
 *   depth 0: .a        variant: .a.v
 *   depth 1: .b.b.b    variant: .b.b.b.v
 */
function selectorFor(cls: string, depth: number): string {
  return `.${cls}`.repeat(depth * 2 + 1);
}

function buildLayer<V extends VariantMap>(css: string, config: StyledConfig<V> | null, depth: number): Layer {
  const variantSource = JSON.stringify(config?.variants ?? {});
  const cls = `zs-${hash(css + "|" + variantSource + "|" + depth)}`;
  const sel = selectorFor(cls, depth);

  const variants: Layer["variants"] = {};
  for (const key in config?.variants ?? {}) {
    variants[key] = {};
    const options = config!.variants![key];
    for (const value in options) {
      const v = hoistKeyframes(resolve([options[value]], []));
      const vcls = `${cls}-${key}-${value}`.replace(/[^\w-]/g, "_");
      variants[key][value] = { cls: vcls, css: v.css ? `${v.rules}${sel}.${vcls}{${v.css}}` : v.rules };
    }
  }

  const defaults: Record<string, string> = {};
  for (const key in config?.defaultVariants ?? {}) {
    const v = (config!.defaultVariants as any)[key];
    if (v != null) defaults[key] = String(v);
  }

  const base = hoistKeyframes(css);
  return { cls, css: base.css ? `${base.rules}${sel}{${base.css}}` : base.rules, variants, defaults };
}

// Elements that can't (or shouldn't) contain a <style> child: void elements,
// raw-text / option elements, and SVG (where <style> isn't hoisted).
const NO_STYLE_CHILD = new Set(
  (
    "area base br col embed hr img input link meta source track wbr textarea select option optgroup " +
    "script style title noscript iframe template canvas video audio picture object " +
    "svg g path circle rect line polyline polygon ellipse text tspan defs use symbol mask clipPath " +
    "linearGradient radialGradient stop foreignObject image pattern marker filter"
  ).split(" ")
);

function canHoldStyles(tag: React.ElementType, props: Record<string, any>): boolean {
  return typeof tag === "string" && !NO_STYLE_CHILD.has(tag) && props.dangerouslySetInnerHTML == null;
}

function styleTag(href: string, css: string): React.ReactElement {
  return React.createElement("style", { key: href, href, precedence: PRECEDENCE }, css);
}

function createComponent(meta: StyledMeta, name: string) {
  const Component = (props: Record<string, any>) => {
    const { as, className, ...rest } = props;
    const styles: React.ReactElement[] = [];
    const classes: string[] = [];

    for (const layer of meta.layers) {
      classes.push(layer.cls);
      if (layer.css) styles.push(styleTag(layer.cls, layer.css));

      for (const key in layer.variants) {
        const raw = rest[key] ?? layer.defaults[key];
        if (raw == null) continue;
        const option = layer.variants[key][String(raw)];
        if (!option) continue;
        classes.push(option.cls);
        if (option.css) styles.push(styleTag(option.cls, option.css));
      }
    }

    // Variant props are for styling only, never forwarded to the DOM.
    for (const key of meta.variantKeys) delete rest[key];
    // Like styled-components: $-prefixed (transient) props never reach the DOM.
    for (const key in rest) if (key[0] === "$") delete rest[key];

    if (className) classes.push(className);

    const tag = as ?? meta.tag;
    const finalProps = { ...rest, className: classes.join(" ") };

    // Prefer rendering the <style> tags *inside* the element. React hoists them
    // to <head> either way, but this keeps the output a single element, which
    // Radix `asChild` / Slot and other cloneElement patterns require.
    if (canHoldStyles(tag, rest)) {
      return React.createElement(tag, finalProps, ...styles, rest.children);
    }
    return React.createElement(React.Fragment, null, ...styles, React.createElement(tag, finalProps));
  };

  Component.displayName = `Styled(${name})`;
  Object.defineProperty(Component, ZS, { value: meta, enumerable: false });
  Component.toString = () => meta.selector;
  return Component;
}

function factory(target: React.ElementType | { [ZS]: StyledMeta }) {
  const parent = isStyled(target) ? target[ZS] : null;
  const tag = parent ? parent.tag : (target as React.ElementType);
  const name = typeof tag === "string" ? tag : (tag as any).displayName || (tag as any).name || "Component";

  return (first: TemplateStringsArray | StyledConfig<VariantMap>, ...values: Interpolation[]) => {
    const isTemplate = Array.isArray(first) && "raw" in (first as object);
    const config = isTemplate ? null : (first as StyledConfig<VariantMap>);
    const css = isTemplate
      ? resolve(first as TemplateStringsArray, values)
      : resolve([config?.base ?? ""], []);

    const depth = parent ? parent.layers.length : 0;
    const layer = buildLayer(css, config, depth);
    const layers = parent ? [...parent.layers, layer] : [layer];

    const variantKeys = new Set(parent?.variantKeys ?? []);
    for (const key in config?.variants ?? {}) variantKeys.add(key);

    return createComponent({ tag, layers, selector: `.${layer.cls}`, variantKeys }, name);
  };
}

/* ------------------------------- Public --------------------------------- */

type StyledFn = {
  <C extends React.ElementType | StyledComponent<any, any>>(
    component: C
  ): StyledFactory<ExtractTag<C>, ExtractProps<C>>;
} & { [K in Intrinsic]: StyledFactory<K> };

/**
 * styled.button`...`            → styled HTML element
 * styled(Link)`...`             → style any component that accepts className
 * styled(Button)`...`           → extend another styled component
 * styled.button({ base, variants, defaultVariants })
 */
export const styled: StyledFn = new Proxy(factory as any, {
  get(target, prop) {
    if (typeof prop !== "string") return (target as any)[prop];
    return factory(prop as Intrinsic);
  },
});
