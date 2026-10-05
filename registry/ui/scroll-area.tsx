"use client";

import type { ComponentProps } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

const Root = styled(ScrollAreaPrimitive.Root)`
  position: relative;
  overflow: hidden;
`;

const Viewport = styled(ScrollAreaPrimitive.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  ${focusRing}
`;

const Bar = styled(ScrollAreaPrimitive.Scrollbar)`
  display: flex;
  padding: 1px;
  user-select: none;
  touch-action: none;
  transition: background-color 150ms;
  &[data-orientation="vertical"] {
    width: 10px;
    height: 100%;
  }
  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: 10px;
  }
`;

const Thumb = styled(ScrollAreaPrimitive.Thumb)`
  position: relative;
  flex: 1;
  background: ${theme.color.border};
  border-radius: ${theme.radius.full};
`;

export function ScrollBar({
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <Bar orientation={orientation} {...props}>
      <Thumb />
    </Bar>
  );
}

export function ScrollArea({ children, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <Root {...props}>
      <Viewport>{children}</Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </Root>
  );
}
