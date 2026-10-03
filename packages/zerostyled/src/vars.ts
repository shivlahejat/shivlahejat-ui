import type { CSSProperties } from "react";

/**
 * Typed helper for passing dynamic values as CSS variables.
 *   style={vars({ bg: color, size: 12 })}  →  { "--bg": color, "--size": 12 }
 * Numbers are passed through as-is; add units in your CSS (calc(var(--size) * 1px)) or pass strings.
 */
export function vars(
  values: Record<string, string | number | null | undefined>,
  style?: CSSProperties
): CSSProperties {
  const out: Record<string, string | number> = { ...(style as any) };
  for (const key in values) {
    const v = values[key];
    if (v != null) out[key.startsWith("--") ? key : `--${key}`] = v;
  }
  return out as CSSProperties;
}
