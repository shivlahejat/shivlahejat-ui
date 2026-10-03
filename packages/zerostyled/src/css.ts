import { hash } from "./hash.js";

/** Marker placed on every styled component so it can be used as a selector: `${Button}:hover &` */
export const ZS = Symbol.for("zerostyled");
export const KF = Symbol.for("zerostyled.keyframes");

// @keyframes can't live inside a nested rule, so interpolated keyframes carry
// their rule between these markers and get hoisted to the top level later.
const KF_START = "\u0001";
const KF_END = "\u0002";

export interface Keyframes {
  readonly name: string;
  readonly rule: string;
  readonly [KF]: true;
  toString(): string;
}

export type Interpolation =
  string | number | false | null | undefined | Keyframes | { [ZS]: { selector: string } };

declare const process: { env?: Record<string, string | undefined> } | undefined;
const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

/** Turn a tagged template into one CSS string. */
export function resolve(strings: TemplateStringsArray | readonly string[], values: unknown[]): string {
  let out = strings[0] ?? "";
  for (let i = 0; i < values.length; i++) {
    out += interpolate(values[i]) + (strings[i + 1] ?? "");
  }
  return minify(out);
}

function interpolate(value: unknown): string {
  if (value == null || value === false) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && (value as any)[KF]) {
    const kf = value as Keyframes;
    return kf.name + KF_START + kf.rule + KF_END;
  }
  if (typeof value === "function" || typeof value === "object") {
    const meta = (value as any)[ZS];
    if (meta) return meta.selector; // styled component used as a selector
  }
  if (typeof value === "function") {
    throw new Error(
      "[zerostyled] Function interpolations like ${(p) => p.color} are not supported. " +
        "Use a CSS variable instead: `color: var(--color)` and pass style={vars({ color })}. " +
        "Or use variants for a fixed set of options."
    );
  }
  if (isDev) console.warn("[zerostyled] Ignoring unsupported interpolation:", value);
  return "";
}

/** Light minification: strip comments, collapse whitespace. Safe for typical CSS. */
export function minify(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim()
    .replace(/;$/, "");
}

/**
 * `css` helper for reusable fragments. Returns a plain string you can
 * interpolate into any styled template or variant.
 */
export function css(strings: TemplateStringsArray, ...values: Interpolation[]): string {
  return resolve(strings, values);
}

/** Split hoisted @keyframes rules out of a resolved CSS string. */
export function hoistKeyframes(input: string): { css: string; rules: string } {
  const rules = new Set<string>();
  const css = input.replace(/\u0001([^\u0002]*)\u0002/g, (_, rule: string) => {
    rules.add(rule);
    return "";
  });
  return { css, rules: [...rules].join("") };
}

/**
 * keyframes`from { opacity: 0 } to { opacity: 1 }` → use it in any template:
 *   animation: ${fadeIn} 150ms ease-out;
 */
export function keyframes(strings: TemplateStringsArray, ...values: Interpolation[]): Keyframes {
  const body = resolve(strings, values);
  const name = `zs-kf-${hash(body)}`;
  const rule = `@keyframes ${name}{${body}}`;
  return { name, rule, [KF]: true, toString: () => name };
}
