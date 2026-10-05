import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";

export default function BubbleDemo() {
  return (
    <BubbleGroup style={{ width: "100%", maxWidth: 420 }}>
      <Bubble variant="muted">
        <BubbleContent>I removed the stale route and rebuilt the registry.</BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up">
          👍
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Great, thanks!</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Anything else?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
