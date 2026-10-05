import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "grid", gap: 4, fontSize: 14 }}>
          <strong>Next.js</strong>
          <span>The React framework for the web.</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
