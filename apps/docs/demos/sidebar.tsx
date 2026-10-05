import { theme } from "@/components/ui/theme";

/** The sidebar is fixed to the viewport, so the preview shows its own page in a frame. */
export default function SidebarDemo() {
  return (
    <iframe
      src="/examples/sidebar"
      title="Sidebar example"
      style={{
        width: "100%",
        height: 520,
        border: `1px solid ${theme.color.border}`,
        borderRadius: theme.radius.lg,
        background: theme.color.background,
      }}
    />
  );
}
