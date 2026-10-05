import { theme } from "@/components/ui/theme";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/components/ui/typography";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const metadata = { title: "Sidebar example" };

const icon = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const nav = [
  { title: "Home", d: "M3 10.5 12 3l9 7.5V21H3z", active: true },
  { title: "Inbox", d: "M22 12h-6l-2 3h-4l-2-3H2M5 5h14l3 7v7H2v-7z", badge: "24" },
  { title: "Calendar", d: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18" },
  { title: "Settings", d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12h2M3 12h2M12 3v2M12 19v2" },
];

/** Full-page demo: the sidebar is fixed to the viewport, so it lives on its own route. */
export default function SidebarDemoPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarInput placeholder="Search…" aria-label="Search" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton as="a" href="#" isActive={item.active} tooltip={item.title}>
                      {icon(item.d)}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Design system">
                  {icon("M4 4h16v16H4z")}
                  <span>Design system</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#" isActive>
                      <span>Tokens</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#">
                      <span>Components</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Account">
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    borderRadius: 8,
                    background: theme.color.primary,
                    color: theme.color.primaryForeground,
                    fontWeight: 600,
                  }}
                >
                  S
                </span>
                <span>shivlahejat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 56,
            padding: "0 16px",
            borderBottom: `1px solid ${theme.color.border}`,
          }}
        >
          <SidebarTrigger />
          <Separator orientation="vertical" style={{ height: 16 }} />
          <Text variant="small">Dashboard</Text>
        </header>
        <div style={{ display: "grid", gap: 12, padding: 24 }}>
          <Heading size="md">Sidebar</Heading>
          <Text variant="muted">
            Press ⌘B / Ctrl+B or click the rail to collapse to icons. On small screens it becomes a sheet.
          </Text>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
