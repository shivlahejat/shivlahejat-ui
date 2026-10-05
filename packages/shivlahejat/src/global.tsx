import * as React from "react";
import { hash } from "./hash.js";
import { resolve, hoistKeyframes, type Interpolation } from "./css.js";

const GLOBAL_PRECEDENCE = "sl-global";

/**
 * Global CSS (resets, fonts, body styles). Render it once, ideally at the
 * top of your root layout so it is discovered before component styles.
 *   const GlobalStyles = globalStyle`body { margin: 0 }`
 *   <GlobalStyles />
 */
export function globalStyle(strings: TemplateStringsArray, ...values: Interpolation[]) {
  const { css: body, rules } = hoistKeyframes(resolve(strings, values));
  const css = rules + body;
  const href = `sl-g-${hash(css)}`;
  const Global = () => React.createElement("style", { href, precedence: GLOBAL_PRECEDENCE }, css);
  Global.displayName = "GlobalStyle";
  return Global;
}

type Tokens = { [key: string]: string | number | Tokens };

type TokenRefs<T> = { [K in keyof T]: T[K] extends Tokens ? TokenRefs<T[K]> : string };

function flatten(tokens: Tokens, prefix: string, out: [string, string][], refs: any) {
  for (const key in tokens) {
    const value = tokens[key];
    const name = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "object") {
      refs[key] = {};
      flatten(value, name, out, refs[key]);
    } else {
      out.push([`--${name}`, String(value)]);
      refs[key] = `var(--${name})`;
    }
  }
}

/**
 * Design tokens as CSS variables. Works on the server, no context provider.
 *   const theme = createTheme({ color: { primary: "#4f46e5" } })
 *   theme.color.primary          → "var(--color-primary)"
 *   <theme.Styles />             → renders :root { --color-primary: #4f46e5 }
 *   createTheme(darkTokens, { selector: '[data-theme="dark"]' })
 */
export function createTheme<T extends Tokens>(tokens: T, options: { selector?: string } = {}) {
  const pairs: [string, string][] = [];
  const refs = {} as TokenRefs<T>;
  flatten(tokens, "", pairs, refs);

  const selector = options.selector ?? ":root";
  const css = `${selector}{${pairs.map(([k, v]) => `${k}:${v}`).join(";")}}`;
  const href = `sl-t-${hash(css)}`;
  const Styles = () => React.createElement("style", { href, precedence: GLOBAL_PRECEDENCE }, css);
  Styles.displayName = "ThemeStyles";

  return Object.assign(refs, { Styles, css });
}
