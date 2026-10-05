"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

export const Tabs = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 2px;
  padding: 3px;
  background: ${theme.color.muted};
  border-radius: ${theme.radius.md};
`;

export const TabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: ${theme.color.mutedForeground};
  background: transparent;
  border: 0;
  border-radius: calc(${theme.radius.md} - 2px);
  cursor: pointer;
  transition:
    color 150ms,
    background-color 150ms;
  ${focusRing}
  &:hover {
    color: ${theme.color.foreground};
  }
  &[data-state="active"] {
    color: ${theme.color.foreground};
    background: ${theme.color.background};
    box-shadow: ${theme.shadow.sm};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const TabsContent = styled(TabsPrimitive.Content)`
  border-radius: ${theme.radius.sm};
  ${focusRing}
`;
