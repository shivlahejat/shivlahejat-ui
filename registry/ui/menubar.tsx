"use client";

import type { ComponentProps } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import {
  menuContentStyles,
  menuItemStyles,
  menuItemVariants,
  menuCheckItemStyles,
  menuIndicatorStyles,
  menuLabelStyles,
  menuSeparatorStyles,
  MenuShortcut,
  checkIcon,
  dotIcon,
  chevronRightIcon,
} from "./dropdown-menu";

/** Desktop-app style menu bar. Shares its item styles with Dropdown Menu. */
export const Menubar = styled(MenubarPrimitive.Root)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  height: 36px;
  padding: 4px;
  background: ${theme.color.background};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.sm};
`;

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSub = MenubarPrimitive.Sub;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

export const MenubarTrigger = styled(MenubarPrimitive.Trigger)`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: ${theme.radius.sm};
  cursor: default;
  user-select: none;
  outline: none;
  &:focus-visible,
  &[data-highlighted],
  &[data-state="open"] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
`;

const Content = styled(MenubarPrimitive.Content)`
  ${menuContentStyles}
  min-width: 192px;
  transform-origin: var(--radix-menubar-content-transform-origin);
`;

export function MenubarContent({
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <Content align={align} alignOffset={alignOffset} sideOffset={sideOffset} {...props} />
    </MenubarPrimitive.Portal>
  );
}

export const MenubarItem = styled(MenubarPrimitive.Item)({
  base: menuItemStyles,
  variants: { variant: menuItemVariants },
  defaultVariants: { variant: "default" },
});

const CheckboxItem = styled(MenubarPrimitive.CheckboxItem)`
  ${menuCheckItemStyles}
`;
const RadioItem = styled(MenubarPrimitive.RadioItem)`
  ${menuCheckItemStyles}
`;
const Indicator = styled.span`
  ${menuIndicatorStyles}
`;

export function MenubarCheckboxItem({
  children,
  ...props
}: ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <CheckboxItem {...props}>
      <Indicator>
        <MenubarPrimitive.ItemIndicator>{checkIcon}</MenubarPrimitive.ItemIndicator>
      </Indicator>
      {children}
    </CheckboxItem>
  );
}

export function MenubarRadioItem({ children, ...props }: ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <RadioItem {...props}>
      <Indicator>
        <MenubarPrimitive.ItemIndicator>{dotIcon}</MenubarPrimitive.ItemIndicator>
      </Indicator>
      {children}
    </RadioItem>
  );
}

const SubTrigger = styled(MenubarPrimitive.SubTrigger)`
  ${menuItemStyles}
`;

export function MenubarSubTrigger({
  children,
  ...props
}: ComponentProps<typeof MenubarPrimitive.SubTrigger>) {
  return (
    <SubTrigger {...props}>
      {children}
      {chevronRightIcon}
    </SubTrigger>
  );
}

const SubContent = styled(MenubarPrimitive.SubContent)`
  ${menuContentStyles}
  transform-origin: var(--radix-menubar-content-transform-origin);
`;

export function MenubarSubContent(props: ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.Portal>
      <SubContent {...props} />
    </MenubarPrimitive.Portal>
  );
}

export const MenubarLabel = styled(MenubarPrimitive.Label)`
  ${menuLabelStyles}
`;

export const MenubarSeparator = styled(MenubarPrimitive.Separator)`
  ${menuSeparatorStyles}
`;

export const MenubarShortcut = MenuShortcut;
