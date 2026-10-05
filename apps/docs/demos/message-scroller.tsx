"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Marker, MarkerContent, MarkerIcon, MarkerShimmer } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { theme } from "@/components/ui/theme";

type Turn = { id: string; role: "user" | "assistant"; text: string };

const replies = [
  "Done. The registry JSON is rebuilt and the docs pick it up on the next dev run.",
  "Yes: every component reads tokens from theme.tsx, so dark mode comes for free.",
  "You can add it with npx shivlahejat-ui add bubble message marker.",
];

export default function MessageScrollerDemo() {
  const [turns, setTurns] = useState<Turn[]>([
    { id: "1", role: "user", text: "Can you rebuild the registry?" },
    { id: "2", role: "assistant", text: replies[0] },
  ]);
  const [thinking, setThinking] = useState(false);

  const send = () => {
    const n = turns.length;
    setTurns((t) => [...t, { id: String(n + 1), role: "user", text: "And one more question…" }]);
    setThinking(true);
    setTimeout(() => {
      setTurns((t) => [
        ...t,
        { id: String(n + 2), role: "assistant", text: replies[(n / 2) % replies.length] },
      ]);
      setThinking(false);
    }, 900);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 440 }}>
      <div
        style={{
          height: 320,
          border: `1px solid ${theme.color.border}`,
          borderRadius: theme.radius.lg,
          overflow: "hidden",
        }}
      >
        <MessageScrollerProvider autoScroll defaultScrollPosition="last-anchor">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent aria-busy={thinking}>
                <Marker variant="separator">
                  <MarkerContent>Today</MarkerContent>
                </Marker>
                {turns.map((t) => (
                  <MessageScrollerItem key={t.id} messageId={t.id} scrollAnchor={t.role === "user"}>
                    {t.role === "user" ? (
                      <Message align="end">
                        <MessageContent>
                          <Bubble align="end">
                            <BubbleContent>{t.text}</BubbleContent>
                          </Bubble>
                          <MessageFooter>Delivered</MessageFooter>
                        </MessageContent>
                      </Message>
                    ) : (
                      <Message>
                        <MessageAvatar>
                          <Avatar size="sm">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>Assistant</MessageHeader>
                          <Bubble variant="muted">
                            <BubbleContent>{t.text}</BubbleContent>
                            {t.id === "2" && (
                              <BubbleReactions role="img" aria-label="Reactions: thumbs up">
                                👍
                              </BubbleReactions>
                            )}
                          </Bubble>
                        </MessageContent>
                      </Message>
                    )}
                  </MessageScrollerItem>
                ))}
                {thinking && (
                  <Marker role="status">
                    <MarkerIcon>
                      <Spinner />
                    </MarkerIcon>
                    <MarkerShimmer>Thinking…</MarkerShimmer>
                  </Marker>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button variant="outline" onClick={send} disabled={thinking} style={{ justifySelf: "start" }}>
        Send a message
      </Button>
    </div>
  );
}
