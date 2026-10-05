import { Flex } from "shivlahejat";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { Text } from "@/components/ui/typography";

export default function CollapsibleDemo() {
  return (
    <>
      <Collapsible style={{ width: "100%", maxWidth: 320 }}>
        <Flex alignItems="center" justifyContent="space-between" gap={12}>
          <Text variant="small">3 starred repositories</Text>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              Toggle
            </Button>
          </CollapsibleTrigger>
        </Flex>
        <CollapsibleContent>
          <Flex direction="column" gap={8} style={{ marginTop: 8 }}>
            <Text variant="small">radix-ui/primitives</Text>
            <Text variant="small">vercel/next.js</Text>
          </Flex>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
