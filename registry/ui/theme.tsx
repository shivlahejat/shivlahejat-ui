import { createTheme, globalStyle, css, keyframes } from "shivlahejat";

/* Design tokens. Edit freely: every component reads from these. */
const light = {
  color: {
    background: "#ffffff",
    foreground: "#15171c",
    muted: "#f3f4f6",
    mutedForeground: "#5e6573",
    card: "#ffffff",
    cardForeground: "#15171c",
    popover: "#ffffff",
    popoverForeground: "#15171c",
    primary: "#2b45d4",
    primaryForeground: "#ffffff",
    secondary: "#eceef3",
    secondaryForeground: "#15171c",
    accent: "#eef1fb",
    accentForeground: "#15171c",
    destructive: "#cf3131",
    destructiveForeground: "#ffffff",
    border: "#e1e4ea",
    input: "#d2d7df",
    ring: "#2b45d4",
    overlay: "rgb(12 14 20 / 0.5)",
    chart1: "#2b45d4",
    chart2: "#0ea5a4",
    chart3: "#f59e0b",
    chart4: "#e1477a",
    chart5: "#8b5cf6",
    sidebar: "#f8f9fb",
    sidebarForeground: "#15171c",
    sidebarAccent: "#eceef3",
    sidebarBorder: "#e1e4ea",
  },
  radius: { sm: "6px", md: "8px", lg: "12px", full: "999px" },
  font: {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
  shadow: {
    sm: "0 1px 2px rgb(16 24 40 / 0.06)",
    md: "0 10px 28px -8px rgb(16 24 40 / 0.22), 0 2px 6px rgb(16 24 40 / 0.06)",
  },
  general: { gridGap: "16px" },
};

const dark = {
  color: {
    background: "#0f1115",
    foreground: "#eceef2",
    muted: "#1b1e25",
    mutedForeground: "#9aa1ae",
    card: "#14171d",
    cardForeground: "#eceef2",
    popover: "#171a21",
    popoverForeground: "#eceef2",
    primary: "#6f86ff",
    primaryForeground: "#0d1020",
    secondary: "#232731",
    secondaryForeground: "#eceef2",
    accent: "#222838",
    accentForeground: "#eceef2",
    destructive: "#e05252",
    destructiveForeground: "#ffffff",
    border: "#262a33",
    input: "#323743",
    ring: "#6f86ff",
    overlay: "rgb(0 0 0 / 0.6)",
    chart1: "#6f86ff",
    chart2: "#2dd4bf",
    chart3: "#fbbf24",
    chart4: "#f472b6",
    chart5: "#a78bfa",
    sidebar: "#121419",
    sidebarForeground: "#eceef2",
    sidebarAccent: "#1f232c",
    sidebarBorder: "#262a33",
  },
  shadow: {
    sm: "0 1px 2px rgb(0 0 0 / 0.4)",
    md: "0 12px 32px -8px rgb(0 0 0 / 0.6), 0 2px 6px rgb(0 0 0 / 0.3)",
  },
};

/** Token references: theme.color.primary === "var(--color-primary)" */
export const theme = createTheme(light);
const darkTheme = createTheme(dark, { selector: '.dark, [data-theme="dark"]' });

const BaseStyles = globalStyle`
  :root { color-scheme: light; }
  .dark, [data-theme="dark"] { color-scheme: dark; }
  *, *::before, *::after { box-sizing: border-box; border-color: ${theme.color.border}; }
  body {
    margin: 0;
    background: ${theme.color.background};
    color: ${theme.color.foreground};
    font-family: ${theme.font.sans};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/** Render once at the top of <body> in your root layout. */
export function ThemeStyles() {
  return (
    <>
      <theme.Styles />
      <darkTheme.Styles />
      <BaseStyles />
    </>
  );
}

/* Shared helpers used by the components */

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${theme.color.ring};
    outline-offset: 2px;
  }
`;

export const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
export const fadeOut = keyframes`from { opacity: 1; } to { opacity: 0; }`;
export const popIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;
export const popOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.96); }
`;
