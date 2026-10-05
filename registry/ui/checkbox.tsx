"use client";

import type { ComponentProps } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

const Root = styled(CheckboxPrimitive.Root)`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  color: ${theme.color.primaryForeground};
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 150ms,
    border-color 150ms;
  ${focusRing}
  &[data-state="checked"],
  &[data-state="indeterminate"] {
    background: ${theme.color.primary};
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

const Indicator = styled(CheckboxPrimitive.Indicator)`
  display: grid;
  place-items: center;
  & > svg {
    width: 12px;
    height: 12px;
  }
`;

export function Checkbox(props: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <Root {...props}>
      <Indicator>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {props.checked === "indeterminate" ? <path d="M5 12h14" /> : <path d="M20 6 9 17l-5-5" />}
        </svg>
      </Indicator>
    </Root>
  );
}
