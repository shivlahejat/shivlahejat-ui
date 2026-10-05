# shivlahejat/ui

shadcn-style components for Next.js, written with styled components.
Copy them into your project with one command, then change anything you like.

- **No setup:** no style registry, no compiler config, no `"use client"` just for styling.
- **The full shadcn/ui set:** all 64 components, from Button to Sidebar, Data Table and the chat components.
- **Server Components:** Button, Card, Table, Field and the other static components render with zero client JavaScript.
- **Accessible:** interactive components are built on Radix (and cmdk, vaul, sonner, embla, react-day-picker
  where shadcn uses them).
- **You own the code:** components live in your repo, not in `node_modules`.

## For users of the library

```bash
npx shivlahejat-ui init                    # adds theme.tsx + installs shivlahejat
npx shivlahejat-ui add button card dialog  # adds components and their dependencies
npx shivlahejat-ui add --all
npx shivlahejat-ui list
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

**Server-safe** (no client JS): Alert, Aspect Ratio, Badge, Breadcrumb, Bubble, Button, Button Group,
Card, Empty, Field, Input, Item, Kbd, Label, Marker, Message, Native Select, Pagination, Separator,
Skeleton, Spinner, Table, Textarea, Typography, Attachment.

**Interactive** (`"use client"`): Accordion, Alert Dialog, Avatar, Calendar, Carousel, Chart, Checkbox,
Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Direction, Drawer,
Dropdown Menu, Hover Card, Input Group, Input OTP, Menubar, Message Scroller, Navigation Menu, Popover,
Progress, Questionnaire, Radio Group, Resizable, Scroll Area, Select, Sheet, Sidebar, Slider, Switch,
Tabs, Toast, Toggle, Toggle Group, Tooltip.

Run `npx shivlahejat-ui list` for descriptions.

Plus `Flex` and the `styled` API from the `shivlahejat` runtime.

## Developing

```bash
git clone https://github.com/shivlahejat/shivlahejat-ui.git
cd shivlahejat-ui
npm install       # Node 20+
npm run dev       # docs site at http://localhost:3000 (landing, guides, a page per component)
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
