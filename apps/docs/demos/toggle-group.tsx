import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <ToggleGroupItem value="left" variant="outline">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" variant="outline">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" variant="outline">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
