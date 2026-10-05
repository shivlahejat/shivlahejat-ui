import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Toggle aria-label="Toggle bold" style={{ fontWeight: 700 }}>
        B
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic" style={{ fontStyle: "italic" }}>
        I
      </Toggle>
    </div>
  );
}
