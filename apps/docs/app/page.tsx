// A Server Component. The static components below render with zero client JS.
import { styled, Flex } from "zerostyled";
import { theme } from "@/components/ui/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading, Text, InlineCode } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "./theme-toggle";

const Page = styled.main`
  max-width: 880px;
  margin: 0 auto;
  padding: 56px 24px 120px;
`;

const Intro = styled.header`
  display: grid;
  gap: 20px;
  padding-bottom: 48px;
  border-bottom: 1px solid ${theme.color.border};
`;

const Install = styled.pre`
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  font-family: ${theme.font.mono};
  font-size: 13px;
  background: ${theme.color.muted};
  border-radius: ${theme.radius.md};
`;

const Specimen = styled.section`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  padding: 40px 0;
  border-bottom: 1px solid ${theme.color.border};
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Meta = styled.div`
  display: grid;
  gap: 6px;
  align-content: start;
`;

const Stage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 360px;
`;

function Section({ name, children, note }: { name: string; note: string; children: React.ReactNode }) {
  return (
    <Specimen id={name.toLowerCase().replace(/\s/g, "-")}>
      <Meta>
        <Heading as="h2" size="sm">
          {name}
        </Heading>
        <Text variant="small" style={{ color: theme.color.mutedForeground }}>
          {note}
        </Text>
      </Meta>
      <Stage>{children}</Stage>
    </Specimen>
  );
}

export default function Home() {
  return (
    <Page>
      <Intro>
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap={12}>
          <Badge variant="outline">v0.1 · 14 components</Badge>
          <ThemeToggle />
        </Flex>
        <Heading as="h1" size="xl">
          Components you own, written with styled components.
        </Heading>
        <Text variant="lead">
          Copy them into your Next.js app with one command. They work in Server Components, need no style
          registry, and every line is yours to change.
        </Text>
        <Install>npx zerostyled-ui init{"\n"}npx zerostyled-ui add button card dialog</Install>
      </Intro>

      <Section name="Button" note="Six variants, four sizes. Server-rendered.">
        <Button>Save changes</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Read the docs</Button>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="lg">Large</Button>
        <Button as="a" href="#dialog" variant="outline">
          Link styled as button
        </Button>
      </Section>

      <Section name="Badge" note="Short status labels.">
        <Badge>Live</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="outline">Archived</Badge>
        <Badge variant="destructive">Failed</Badge>
      </Section>

      <Section name="Form fields" note="Input, Textarea and Label share focus and error states.">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </Field>
        <Field>
          <Label htmlFor="handle">Username</Label>
          <Input id="handle" defaultValue="taken-name" aria-invalid="true" />
          <Text variant="small" style={{ color: theme.color.destructive }}>
            That username is taken.
          </Text>
        </Field>
        <Field>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="A sentence or two about you" />
        </Field>
      </Section>

      <Section name="Card" note="Composable parts for grouped content.">
        <Card style={{ width: "100%", maxWidth: 380 }}>
          <CardHeader>
            <CardTitle>Invite your team</CardTitle>
            <CardDescription>They will get an email with a link to join.</CardDescription>
          </CardHeader>
          <CardContent>
            <Field style={{ maxWidth: "none" }}>
              <Label htmlFor="invite">Email addresses</Label>
              <Input id="invite" placeholder="ana@acme.com, li@acme.com" />
            </Field>
          </CardContent>
          <CardFooter>
            <Button>Send invites</Button>
            <Button variant="ghost">Cancel</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section name="Dialog" note="Radix-based. Trigger uses asChild from a Server Component.">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Changes are visible to your team right away.</DialogDescription>
            </DialogHeader>
            <Field style={{ maxWidth: "none" }}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Priya Shah" />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section name="Dropdown Menu" note="Keyboard navigable, with labels and shortcuts.">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem>
              Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem disabled>Team (coming soon)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section name="Tabs" note="Arrow keys move between tabs.">
        <Tabs defaultValue="account" style={{ width: "100%" }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Text variant="muted">Update your name and email address.</Text>
          </TabsContent>
          <TabsContent value="password">
            <Text variant="muted">Change your password. You will be signed out on other devices.</Text>
          </TabsContent>
        </Tabs>
      </Section>

      <Section name="Tooltip" note="No provider needed in your layout.">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Add item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add item</TooltipContent>
        </Tooltip>
      </Section>

      <Section name="Switch & Separator" note="Toggle settings, divide content.">
        <Flex direction="column" gap={16} fullWidth>
          <Flex alignItems="center" gap={10}>
            <Switch id="notify" defaultChecked />
            <Label htmlFor="notify">Email notifications</Label>
          </Flex>
          <Separator />
          <Flex alignItems="center" gap={12} style={{ height: 20 }}>
            <Text variant="small">Docs</Text>
            <Separator orientation="vertical" />
            <Text variant="small">Source</Text>
            <Separator orientation="vertical" />
            <Text variant="small">Changelog</Text>
          </Flex>
        </Flex>
      </Section>

      <Section name="Typography" note="Heading size is independent of the element.">
        <Flex direction="column" gap={8}>
          <Heading size="md">Ship faster with components you own</Heading>
          <Text>
            Body text uses the system font stack. Swap it in <InlineCode>theme.tsx</InlineCode>.
          </Text>
          <Text variant="muted">Muted text for secondary information.</Text>
        </Flex>
      </Section>
    </Page>
  );
}
