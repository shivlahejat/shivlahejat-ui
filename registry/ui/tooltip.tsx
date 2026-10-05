"use client";

import type { ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled } from "shivlahejat";
import { theme, popIn } from "./theme";

/** Each Tooltip brings its own provider, so there's nothing to set up in your layout. */
export function Tooltip({ delayDuration = 200, ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props} />
    </TooltipPrimitive.Provider>
  );
}

export const TooltipTrigger = TooltipPrimitive.Trigger;

const Content = styled(TooltipPrimitive.Content)`
  z-index: 50;
  max-width: 280px;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.4;
  color: ${theme.color.background};
  background: ${theme.color.foreground};
  border-radius: ${theme.radius.sm};
  transform-origin: var(--radix-tooltip-content-transform-origin);
  animation: ${popIn} 120ms ease-out;
`;

export function TooltipContent({
  sideOffset = 6,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <Content sideOffset={sideOffset} {...props} />
    </TooltipPrimitive.Portal>
  );
}
