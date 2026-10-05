import { Flex } from "shivlahejat";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <>
      <Flex direction="column" gap={12} fullWidth>
        <Alert>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>You can add components with the CLI.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Check your card details and try again.</AlertDescription>
        </Alert>
      </Flex>
    </>
  );
}
