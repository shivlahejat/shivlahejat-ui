# zerostyled

The styled-components experience for the Next.js App Router, with **zero setup**.

- Works in **Server Components** and Client Components
- No style registry, no compiler plugin, no `"use client"`, no `next.config` changes
- Typed variants, extending, `as` prop, theme tokens
- Tiny: the whole runtime is a few hundred lines with no dependencies

```bash
npm install zerostyled
```

Requires React 19 (Next.js 15+).

## Usage

```tsx
// app/page.tsx — a Server Component
import styled from "zerostyled"; // or: import { styled } from "zerostyled"

const Title = styled.h1`
  font-size: 48px;
  &:hover {
    color: royalblue;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

export default function Page() {
  return <Title>Hello</Title>;
}
```

That's it. No layout changes, no config.

### Built-in `Flex`

No need to keep your own `Flex` file. Same props as the common styled-components helper,
in plain or `$` form, and none of them reach the DOM:

```tsx
import { Flex } from "zerostyled";

<Flex direction="column" alignItems="center" justifyContent="space-between" wrap="wrap" fullWidth>
<Flex $direction="row" $alignItems="center" gap={12}>
<Flex grid>                 {/* negative margins from theme general.gridGap */}
<Flex grid gridGap={16}>    {/* or override per row */}
<Flex as="ul">              {/* render any element */}
```

| Prop                                 | Default                 | Notes                                                               |
| ------------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| `direction` / `$direction`           | `row`                   |                                                                     |
| `alignItems` / `$alignItems`         | `flex-start`            |                                                                     |
| `justifyContent` / `$justifyContent` | `flex-start`            |                                                                     |
| `wrap` / `$wrap`                     | `nowrap`                |                                                                     |
| `gap` / `$gap`                       | none                    | numbers become px                                                   |
| `fullWidth` / `$fullWidth`           | `false`                 | `width: 100%`                                                       |
| `grid` / `$grid`                     | `false`                 | wraps, negative side margins, children `> div` don't grow or shrink |
| `gridGap`                            | theme `general.gridGap` | set it with `createTheme({ general: { gridGap: "15px" } })`         |

Extend it like any component: `const Toolbar = styled(Flex)\`padding: 8px;\``.

### Variants

```tsx
const Button = styled.button({
  base: css`
    padding: 10px 18px;
    border-radius: 8px;
  `,
  variants: {
    tone: { primary: "background: blue; color: white;", ghost: "background: none;" },
    size: { sm: "font-size: 14px;", md: "" },
    block: { true: "width: 100%;" },
  },
  defaultVariants: { tone: "primary", size: "md" },
});

<Button tone="ghost" size="sm" block>
  Save
</Button>;
```

Variant props are fully typed and never forwarded to the DOM.

### Extending and wrapping

```tsx
const Danger = styled(Button)`
  background: crimson;
`; // overrides always win
const NavLink = styled(Link)`
  text-decoration: none;
`; // any component that accepts className
<Button as="a" href="/docs">
  Docs
</Button>; // "as" also swaps the prop types
```

### Styled components as selectors

```tsx
const Icon = styled.span`
  transition: transform 0.2s;
`;
const Row = styled.a`
  &:hover ${Icon} {
    transform: translateX(4px);
  }
`;
```

### Animations

```tsx
import { styled, keyframes } from "zerostyled";

const fadeIn = keyframes`from { opacity: 0 } to { opacity: 1 }`;
const Panel = styled.div`
  &[data-state="open"] {
    animation: ${fadeIn} 150ms ease-out;
  }
`;
```

### Transient props

Like styled-components, any `$`-prefixed prop (`$active`, `$size`) is never forwarded to the DOM.

### Dynamic values

Function interpolations like `${(p) => p.color}` are intentionally not supported:
they generate new CSS for every value and don't work on the server. Use CSS variables:

```tsx
import { styled, vars } from "zerostyled";

const Bar = styled.div`
  width: calc(var(--progress) * 1%);
  background: var(--color);
`;

<Bar style={vars({ progress: 40, color: "teal" })} />;
```

### Theme and global styles

```tsx
// app/theme.ts
import { createTheme, globalStyle } from "zerostyled";

export const theme = createTheme({ color: { accent: "#2457f5" }, radius: "8px" });
// theme.color.accent === "var(--color-accent)"

export const darkTheme = createTheme({ color: { accent: "#7aa2ff" } }, { selector: '[data-theme="dark"]' });

export const GlobalStyles = globalStyle`body { margin: 0; }`;
```

```tsx
// app/layout.tsx — render these first, before your page content
<body>
  <theme.Styles />
  <darkTheme.Styles />
  <GlobalStyles />
  {children}
</body>
```

## Migrating from styled-components

1. Delete `registry.tsx` / `StyledComponentsRegistry` from your layout and `compiler.styledComponents` from `next.config`.
2. Replace `from "styled-components"` with `from "zerostyled"`.
3. Delete your own `Flex` file and import `{ Flex }` instead.
4. Replace `ThemeProvider` with `createTheme()` and render `<theme.Styles />` in the root layout.
   `${(p) => p.theme.color.primary}` becomes `${theme.color.primary}`.
5. Rewrite remaining prop functions: fixed options become variants, open-ended values become `vars()`.
6. Remove `"use client"` from files that only had it for styling.

## How it works

Each component renders its CSS as `<style href="zs-hash" precedence="zs">`.
React 19 hoists these into `<head>`, removes duplicates, and handles streaming SSR,
so there's nothing to set up. Nesting (`&:hover`, `@media`) uses native CSS nesting.
Class names are deterministic hashes, so server and client always agree.

Extended components get a higher selector specificity than their base, and variants one step
above their own base styles, so overrides work regardless of stylesheet order.

## Browser support

Native CSS nesting: Chrome 120+, Safari 17.2+, Firefox 117+.

## Limitations

- React 19+ only.
- No function interpolations (use CSS variables or variants).
- Minification is lightweight; avoid `;` `{` `}` inside CSS string values like `content: ";"`.

## Development

```bash
npm install
npm test          # builds and runs SSR tests
npm run typecheck # checks the public types
cd example && npm install && npm run dev
```

## License

MIT
