"use client";

import type { ComponentProps } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "shivlahejat";
import { theme, popIn, popOut } from "./theme";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

const Content = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 288px;
  max-width: calc(100vw - 16px);
  padding: 16px;
  font-size: 14px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  outline: none;
  transform-origin: var(--radix-popover-content-transform-origin);
  &[data-state="open"] {
    animation: ${popIn} 120ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${popOut} 100ms ease-in;
  }
`;

export function PopoverContent({
  align = "center",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <Content align={align} sideOffset={sideOffset} {...props} />
    </PopoverPrimitive.Portal>
  );
}
