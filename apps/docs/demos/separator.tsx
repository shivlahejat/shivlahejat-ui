import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/typography";

export default function SeparatorDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <Text style={{ fontWeight: 500 }}>shivlahejat/ui</Text>
      <Text variant="muted">Components written with styled.</Text>
      <Separator style={{ margin: "16px 0" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 20, fontSize: 14 }}>
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  );
}
