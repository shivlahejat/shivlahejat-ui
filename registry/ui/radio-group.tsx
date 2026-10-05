"use client";

import type { ComponentProps } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

export const RadioGroup = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 12px;
`;

const Item = styled(RadioGroupPrimitive.Item)`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-radius: ${theme.radius.full};
  cursor: pointer;
  transition: border-color 150ms;
  ${focusRing}
  &[data-state="checked"] {
    border-color: ${theme.color.primary};
  }
  &[aria-invalid="true"] {
    border-color: ${theme.color.destructive};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Indicator = styled(RadioGroupPrimitive.Indicator)`
  display: block;
  width: 8px;
  height: 8px;
  background: ${theme.color.primary};
  border-radius: ${theme.radius.full};
`;

export function RadioGroupItem(props: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <Item {...props}>
      <Indicator />
    </Item>
  );
}
