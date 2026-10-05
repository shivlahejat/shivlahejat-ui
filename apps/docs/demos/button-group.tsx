import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export default function ButtonGroupDemo() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
        <Button variant="outline">Snooze</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="example.com" style={{ width: 160 }} />
      </ButtonGroup>
      <ButtonGroup>
        <Button>Deploy</Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="More deploy options">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </ButtonGroup>
    </>
  );
}
