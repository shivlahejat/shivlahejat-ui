"use client";

import type { ComponentProps } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { styled } from "shivlahejat";
import { theme, popIn, popOut } from "./theme";

export function HoverCard({
  openDelay = 200,
  closeDelay = 100,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

const Content = styled(HoverCardPrimitive.Content)`
  z-index: 50;
  width: 256px;
  max-width: calc(100vw - 16px);
  padding: 16px;
  font-size: 14px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  outline: none;
  transform-origin: var(--radix-hover-card-content-transform-origin);
  &[data-state="open"] {
    animation: ${popIn} 120ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${popOut} 100ms ease-in;
  }
`;

export function HoverCardContent({
  align = "center",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal>
      <Content align={align} sideOffset={sideOffset} {...props} />
    </HoverCardPrimitive.Portal>
  );
}
