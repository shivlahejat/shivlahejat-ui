"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageAvatar, MessageContent, MessageGroup, MessageHeader } from "@/components/ui/message";

export default function MessageDemo() {
  return (
    <MessageGroup style={{ width: "100%", maxWidth: 440 }}>
      <Message>
        <MessageAvatar />
        <MessageContent>
          <MessageHeader>Olivia</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Are we still on for Friday?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>I booked the room for 3pm.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
