import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Text } from "@/components/ui/typography";

export default function KbdDemo() {
  return (
    <>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <Text variant="small">
        Press <Kbd>Esc</Kbd> to close
      </Text>
    </>
  );
}
