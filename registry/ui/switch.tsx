"use client";

import type { ComponentProps } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "zerostyled";
import { theme, focusRing } from "./theme";

const Root = styled(SwitchPrimitive.Root)`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 20px;
  padding: 2px;
  border: 0;
  border-radius: ${theme.radius.full};
  background: ${theme.color.input};
  cursor: pointer;
  transition: background-color 150ms;
  ${focusRing}
  &[data-state="checked"] {
    background: ${theme.color.primary};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Thumb = styled(SwitchPrimitive.Thumb)`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: ${theme.radius.full};
  background: ${theme.color.background};
  box-shadow: ${theme.shadow.sm};
  transition: transform 150ms;
  &[data-state="checked"] {
    transform: translateX(16px);
  }
`;

export function Switch(props: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <Root {...props}>
      <Thumb />
    </Root>
  );
}
