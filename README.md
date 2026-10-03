# zerostyled/ui

shadcn-style components for Next.js, written with styled components.
Copy them into your project with one command, then change anything you like.

- **No setup:** no style registry, no compiler config, no `"use client"` just for styling.
- **Server Components:** Button, Card, Badge, Input and the other static components render with zero client JavaScript.
- **Accessible:** interactive components (Dialog, Dropdown Menu, Tabs, Tooltip, Switch) are built on Radix.
- **You own the code:** components live in your repo, not in `node_modules`.

## For users of the library

```bash
npx zerostyled-ui init                    # adds theme.tsx + installs zerostyled
npx zerostyled-ui add button card dialog  # adds components and their dependencies
npx zerostyled-ui add --all
npx zerostyled-ui list
```

Then render the theme once in `app/layout.tsx`:

```tsx
import { ThemeStyles } from "@/components/ui/theme";

<body>
  <ThemeStyles />
  {children}
</body>;
```

Use components anywhere, including Server Components:

```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
  </DialogContent>
</Dialog>;
```

Dark mode: add the `dark` class (or `data-theme="dark"`) to `<html>`. Change colors, radius and
fonts in `components/ui/theme.tsx`.

### Components

| Server-safe                                                                                    | Interactive (Radix, `"use client"`)          |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Button, Badge, Card, Input, Textarea, Label, Separator, Typography (Heading, Text, InlineCode) | Dialog, Dropdown Menu, Tabs, Tooltip, Switch |

Plus `Flex` and the `styled` API from the `zerostyled` runtime.

## Developing

```bash
git clone https://github.com/your-name/zerostyled-ui.git
cd zerostyled-ui
npm install       # Node 20+
npm run dev       # docs site at http://localhost:3000
npm run check     # formatting, tests, type check, build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the folder layout, how to add a component, and how releases work.

### Works with the shadcn CLI too

Build the registry with absolute URLs and people can install with shadcn's own CLI:

```bash
node scripts/build-registry.mjs --base-url https://your-site.com/r
npx shadcn add https://your-site.com/r/button.json
```

## License

MIT
