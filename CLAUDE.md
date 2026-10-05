# shivlahejat/ui — project context

shadcn-style UI components for Next.js, written with a styled-components–style API that needs
**no setup**: no style registry, no compiler config, no `"use client"` just for styling.

## Name

The project was called "zerostyled"; it is now named after the author. npm packages: runtime
`shivlahejat`, CLI `shivlahejat-ui` (`npx shivlahejat-ui add button`); site name `shivlahejat/ui`;
config file `shivlahejat-ui.json`; class/variable prefix `sl-`; GitHub
`shivlahejat/shivlahejat-ui`; registry `https://shivlahejat-ui.vercel.app/r`. The local folder is
still called `zerostyled-ui` (rename it yourself if you like; nothing depends on it).

## How we got here

1. Goal was a dev-focused npm package for a Next.js developer.
2. Pain point: styled-components in the App Router needs a server-side style registry, compiler
   config and `"use client"` everywhere, and can't run in Server Components.
3. Built **shivlahejat**, a runtime with the same `styled` API but zero setup.
4. Added a built-in `Flex` matching the user's existing styled-components `Flex` (same props,
   plain and `$`-prefixed), so their `Flex.js` can be deleted.
5. Grew it into a **shadcn-style library**: a CLI copies component source into the user's project.
6. Set up the monorepo: npm workspaces, Prettier, GitHub Actions CI, Changesets releases.

## Layout

| Path                         | What it is                                                         |
| ---------------------------- | ------------------------------------------------------------------ |
| `packages/shivlahejat`       | Styling runtime (npm: `shivlahejat`)                               |
| `packages/cli`               | CLI (npm: `shivlahejat-ui`): `init`, `add <names> / --all`, `list` |
| `registry/ui/*.tsx`          | Component sources. **Edit components here only.**                  |
| `registry/registry.json`     | Each component's files, npm deps and registry deps                 |
| `scripts/build-registry.mjs` | Builds shadcn-format JSON per component into `apps/docs/public/r`  |
| `apps/docs`                  | Showcase site; also hosts the registry JSON                        |

`apps/docs/components/ui` and `apps/docs/public/r` are **generated** by `npm run sync` in the docs
app (runs before `dev`/`build`) and are gitignored. Never edit them.

## Commands

```bash
npm install        # Node 20+; also builds the runtime (prepare script)
npm run dev        # docs at http://localhost:3000
npm run check      # format check + all tests + typecheck + docs build (same as CI)
npm test           # runtime (18) + CLI (8) tests
npm run changeset  # describe a release-worthy change
```

## How the runtime works (packages/shivlahejat/src)

- `styled.tsx`: each component renders `<style href={hash} precedence="sl">`. **React 19 hoists
  these to `<head>` and dedupes by href**, which is what removes the need for a registry. Works in
  Server Components and with streaming SSR.
- Style tags are rendered **inside** the element (single element output), because Radix `asChild`
  / Slot needs exactly one child element, including across the RSC boundary. Void elements,
  textarea/select, SVG etc. fall back to sibling `<style>` tags (`NO_STYLE_CHILD` list).
- Class names are deterministic hashes (`hash.ts`), so server and client always match.
- Nesting (`&:hover`, `@media`, `> div`) uses **native CSS nesting**; no CSS parser.
- Overrides without ordering issues: extension layer at depth `d` repeats its class `2d+1` times;
  variants add one more class on top of their own layer.
- Variants: `styled.button({ base, variants, defaultVariants })`, typed; variant props and any
  `$`-prefixed props are never forwarded to the DOM.
- `as` prop is polymorphic in the types (props switch with the element).
- **Function interpolations `${(p) => ...}` are intentionally unsupported** (throws with a helpful
  message). Dynamic values use CSS variables via `vars()`; fixed options use variants.
- `keyframes` (`css.ts`): rules are carried between `\u0001…\u0002` markers and hoisted to the top
  level of the stylesheet (`@keyframes` can't be nested).
- `createTheme(tokens, { selector })` → token refs like `var(--color-primary)` plus a `<Styles/>`
  component. `globalStyle` for global CSS. Both use precedence `sl-global`.
- `Flex` (`flex.tsx`) sets every CSS variable inline on each element so nested Flex never inherits
  the parent's values. `grid` uses `--general-gridGap` from the theme.
- Default export is `styled`, matching `import styled from "styled-components"`.

## Components (registry/ui)

All 64 shadcn/ui components (as listed on ui.shadcn.com/docs/components) plus `theme`.

- Server-safe: alert, aspect-ratio (pure CSS), attachment, badge, breadcrumb, bubble, button,
  button-group, card, empty, field, input, item, kbd, label, marker, message, native-select,
  pagination, separator, skeleton, spinner, table, textarea, typography.
- Interactive (`"use client"`): Radix-based ones plus accordion, calendar (react-day-picker v10,
  styles `rdp-*` classes from one wrapper), carousel (embla), chart (recharts v3), combobox
  (popover + command), command (cmdk), data-table (TanStack Table **v8**, pinned as
  `@tanstack/react-table@^8`; v9 has a different API), date-picker, drawer (vaul), input-otp,
  message-scroller and questionnaire (behaviour from `@shadcn/react`, we only style its parts),
  resizable (react-resizable-panels v4: `Group`/`Panel`/`Separator`, `orientation` prop), sidebar,
  toast (sonner, themed via its CSS variables).
- `dropdown-menu.tsx` exports the shared menu styles (`menuItemStyles` etc.); context-menu and
  menubar import them, so they list `dropdown-menu` as a registry dependency.
- `theme.tsx`: light and dark tokens (dark via `.dark` or `[data-theme="dark"]` on `<html>`),
  including `chart1`–`chart5` and `sidebar*` tokens, base styles, reduced-motion handling,
  `focusRing`, shared keyframes. Rendered once with `<ThemeStyles />` in the root layout.
- Components use only theme tokens, never hard-coded colors.
- We use the `as` prop where shadcn uses `asChild`/`render` (e.g. `SidebarMenuButton as="a"`).
- Radix roots whose props are a union (Accordion, ToggleGroup) are wrapped in a function with a
  cast, because the styled wrapper's prop types flatten unions.
- Any part that sets `display` must keep `&[hidden] { display: none; }` when the library toggles
  the `hidden` attribute (questionnaire).
- One demo per component in `apps/docs/demos/<name>.tsx` (default export), registered in
  `demos/index.ts`. The file is shown verbatim in the Code tab, so keep demos copy-paste friendly
  (imports from `@/components/ui/...`, no docs-only helpers).

## Docs site (apps/docs), modelled on ui.shadcn.com's structure (own branding and wording)

- `app/layout.tsx`: html/body, no-flash theme script, `ThemeStyles`, `Toaster`.
- `app/(site)/layout.tsx`: sticky header (logo, nav, ⌘K search, GitHub, theme toggle) + footer.
- `app/(site)/page.tsx`: landing page (hero + live examples built from demos).
- `app/(site)/docs/layout.tsx`: left sidebar (guides + all components) and content.
- Guides: `docs` (intro), `installation`, `theming`, `dark-mode`, `cli`, `styled`, `shadcn`.
  Sidebar order lives in `lib/nav.ts`.
- `docs/components` index grid; `docs/components/[name]`: Preview/Code tabs, CLI install
  (npm/pnpm/yarn/bun), manual install steps (deps, full source, registry deps), usage, prev/next.
  All statically generated from `registry/registry.json` via `lib/registry.ts`.
- `app/examples/sidebar`: full-page sidebar example outside the site chrome, shown in an iframe.
- `components/site/*`: site-only parts (header, docs nav, mobile nav sheet, search, code block
  highlighted at build time with shiki using dual light/dark themes, copy button, prose, steps).
- Registry JSON: on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` (or `REGISTRY_BASE_URL`) makes
  `registryDependencies` absolute URLs automatically, so `npx shadcn add <url>` works. Our CLI
  resolves such URLs from a local registry folder when the file is there.

## Conventions and gotchas

- Requires **React 19 / Next.js 15+**.
- Prettier formats CSS inside styled templates (e.g. rewrites `.8` to `0.8`), so tests asserting
  on CSS output should match the formatted form.
- Adding a component: add `registry/ui/<name>.tsx`, an entry in `registry/registry.json`, any new
  npm dep to `apps/docs/package.json`, a demo in `apps/docs/demos/<name>.tsx` (+ `demos/index.ts`),
  a short Usage snippet in `apps/docs/lib/usage.ts` (import + minimal JSX; list variant options as
  `variant="a | b"` like shadcn), then `npm run check`.
- Component pages show install commands like shadcn: tabs pnpm/npm/yarn/bun with
  `pnpm dlx shivlahejat-ui@latest add <name>`, plus a "shadcn CLI" tab
  (`shadcn@latest add @shivlahejat/<name>`, needs the `@shivlahejat` registry in components.json).
- Registry JSON is shadcn-compatible; `--base-url` makes `registryDependencies` absolute so
  `npx shadcn add https://site/r/button.json` also works.
- CLI never overwrites existing files without `--overwrite`; installs only missing deps using
  the detected package manager; uses `src/components/ui` when a `src/` folder exists.

## Verified so far

- All tests pass; typecheck and Next.js production build pass with all 64 components.
- Earlier: Playwright browser tests (dialog focus trap + Escape, dropdown keyboard nav, tabs,
  tooltip, dark mode); `asChild` triggers from a Server Component get Radix attributes.
- jsdom smoke test against the real production bundle: every page (landing, guides, all 64
  component pages, sidebar example) hydrates with no console errors and no `<style>` left in
  `<body>`. Preview/Code tabs, CLI/Manual tabs, package-manager tabs, ⌘K search, theme toggle,
  dialog/select demos and sidebar collapse work.
  Not yet checked visually in a real browser.
- Sandbox gotcha: the mounted folder doesn't allow deleting files, so `next build` hangs trying to
  clear `.next`. Build from a copy on local disk instead.

## Not done yet / next steps

- Confirm npm names `shivlahejat` and `shivlahejat-ui`
  are free.
- Deploy `apps/docs` (e.g. Vercel), then set `DEFAULT_REGISTRY` in `packages/cli/bin/index.mjs`.
- Add `NPM_TOKEN` secret on GitHub for automated releases.
- Look over every component in a real browser (light and dark) and polish spacing.
- CLI parity with shadcn: `view`, `--dry-run`, `--diff`.
- Ideas: compound variants, per-component docs pages with code snippets, benchmark vs styled-components, a codemod for
  migrating from styled-components (imports, `ThemeProvider` → `createTheme`, prop functions →
  `vars()`/variants).
