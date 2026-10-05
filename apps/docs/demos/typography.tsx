import { Flex } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { Heading, InlineCode, Text } from "@/components/ui/typography";

export default function TypographyDemo() {
  return (
    <>
      <Flex direction="column" gap={8}>
        <Heading size="md">Ship faster with components you own</Heading>
        <Text>
          Body text uses the system font stack. Swap it in <InlineCode>theme.tsx</InlineCode>.
        </Text>
        <Text variant="muted">Muted text for secondary information.</Text>
      </Flex>
    </>
  );
}
