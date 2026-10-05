import { ScrollArea } from "@/components/ui/scroll-area";
import { theme } from "@/components/ui/theme";
import { Text } from "@/components/ui/typography";

export default function ScrollAreaDemo() {
  return (
    <>
      <ScrollArea
        style={{ height: 180, width: 220, border: `1px solid ${theme.color.border}`, borderRadius: 8 }}
      >
        <div style={{ padding: 12 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <Text key={i} variant="small" style={{ padding: "4px 0" }}>
              v1.2.0-beta.{30 - i}
            </Text>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
