import { Flex } from "shivlahejat";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Message } from "@/components/ui/message";

export default function InputGroupDemo() {
  return (
    <>
      <Flex direction="column" gap={12} fullWidth style={{ maxWidth: 360 }}>
        <InputGroup>
          <InputGroupInput placeholder="Search…" aria-label="Search" />
          <InputGroupAddon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" aria-label="Website" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Copy</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Ask anything…" aria-label="Message" />
          <InputGroupAddon align="block-end">
            <InputGroupText>Markdown supported</InputGroupText>
            <InputGroupButton variant="default" size="sm" style={{ marginLeft: "auto" }}>
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Flex>
    </>
  );
}
