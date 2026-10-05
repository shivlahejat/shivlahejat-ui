"use client";

import type { ComponentProps } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "shivlahejat";
import { theme, popIn, popOut } from "./theme";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

const icon = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const Trigger = styled(SelectPrimitive.Trigger)({
  base: `
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: fit-content;
    min-width: 180px;
    padding: 0 10px 0 12px;
    font: inherit;
    font-size: 14px;
    white-space: nowrap;
    color: ${theme.color.foreground};
    background: ${theme.color.background};
    border: 1px solid ${theme.color.input};
    border-radius: ${theme.radius.md};
    cursor: pointer;
    transition: border-color 150ms, box-shadow 150ms;
    &[data-placeholder] { color: ${theme.color.mutedForeground}; }
    &:focus-visible {
      outline: none;
      border-color: ${theme.color.ring};
      box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
    }
    &[aria-invalid="true"] { border-color: ${theme.color.destructive}; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
    & > span { overflow: hidden; text-overflow: ellipsis; }
    & > svg { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.5; }
  `,
  variants: {
    size: {
      default: "height: 36px;",
      sm: "height: 32px; font-size: 13px;",
    },
  },
  defaultVariants: { size: "default" },
});

export function SelectTrigger({ children, ...props }: ComponentProps<typeof Trigger>) {
  return (
    <Trigger {...props}>
      {children}
      <SelectPrimitive.Icon asChild>{icon("m6 9 6 6 6-6")}</SelectPrimitive.Icon>
    </Trigger>
  );
}

const Content = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;
  min-width: 8rem;
  max-height: var(--radix-select-content-available-height);
  overflow: hidden;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  transform-origin: var(--radix-select-content-transform-origin);
  &[data-state="open"] {
    animation: ${popIn} 120ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${popOut} 100ms ease-in;
  }
  &[data-side="bottom"] {
    translate: 0 4px;
  }
  &[data-side="top"] {
    translate: 0 -4px;
  }
`;

const Viewport = styled(SelectPrimitive.Viewport)`
  padding: 4px;
  &[data-position="popper"] {
    width: 100%;
    min-width: var(--radix-select-trigger-width);
  }
`;

const ScrollUp = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  cursor: default;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;
const ScrollDown = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  cursor: default;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export function SelectContent({
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <Content position={position} {...props}>
        <ScrollUp>{icon("m18 15-6-6-6 6")}</ScrollUp>
        <Viewport data-position={position}>{children}</Viewport>
        <ScrollDown>{icon("m6 9 6 6 6-6")}</ScrollDown>
      </Content>
    </SelectPrimitive.Portal>
  );
}

export const SelectLabel = styled(SelectPrimitive.Label)`
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.color.mutedForeground};
`;

const Item = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 32px 6px 8px;
  font-size: 14px;
  border-radius: ${theme.radius.sm};
  cursor: default;
  user-select: none;
  outline: none;
  &[data-highlighted] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ItemCheck = styled.span`
  position: absolute;
  right: 8px;
  display: flex;
  & svg {
    width: 16px;
    height: 16px;
  }
`;

export function SelectItem({ children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <Item {...props}>
      <ItemCheck>
        <SelectPrimitive.ItemIndicator>{icon("M20 6 9 17l-5-5")}</SelectPrimitive.ItemIndicator>
      </ItemCheck>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </Item>
  );
}

export const SelectSeparator = styled(SelectPrimitive.Separator)`
  height: 1px;
  margin: 4px -4px;
  background: ${theme.color.border};
`;
