"use client";

import type { ComponentProps } from "react";
import * as MenuPrimitive from "@radix-ui/react-context-menu";
import { styled } from "shivlahejat";
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

/** Right-click (or long-press) menu. Shares its styles with Dropdown Menu. */
export const ContextMenu = MenuPrimitive.Root;
export const ContextMenuTrigger = MenuPrimitive.Trigger;
export const ContextMenuGroup = MenuPrimitive.Group;
export const ContextMenuPortal = MenuPrimitive.Portal;
export const ContextMenuSub = MenuPrimitive.Sub;
export const ContextMenuRadioGroup = MenuPrimitive.RadioGroup;

const Content = styled(MenuPrimitive.Content)`
  ${menuContentStyles}
  max-height: var(--radix-context-menu-content-available-height);
  transform-origin: var(--radix-context-menu-content-transform-origin);
`;

export function ContextMenuContent(props: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <Content {...props} />
    </MenuPrimitive.Portal>
  );
}

export const ContextMenuItem = styled(MenuPrimitive.Item)({
  base: menuItemStyles,
  variants: { variant: menuItemVariants },
  defaultVariants: { variant: "default" },
});

const CheckboxItem = styled(MenuPrimitive.CheckboxItem)`
  ${menuCheckItemStyles}
`;
const RadioItem = styled(MenuPrimitive.RadioItem)`
  ${menuCheckItemStyles}
`;
const Indicator = styled.span`
  ${menuIndicatorStyles}
`;

export function ContextMenuCheckboxItem({
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <CheckboxItem {...props}>
      <Indicator>
        <MenuPrimitive.ItemIndicator>{checkIcon}</MenuPrimitive.ItemIndicator>
      </Indicator>
      {children}
    </CheckboxItem>
  );
}

export function ContextMenuRadioItem({ children, ...props }: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <RadioItem {...props}>
      <Indicator>
        <MenuPrimitive.ItemIndicator>{dotIcon}</MenuPrimitive.ItemIndicator>
      </Indicator>
      {children}
    </RadioItem>
  );
}

const SubTrigger = styled(MenuPrimitive.SubTrigger)`
  ${menuItemStyles}
`;

export function ContextMenuSubTrigger({
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubTrigger>) {
  return (
    <SubTrigger {...props}>
      {children}
      {chevronRightIcon}
    </SubTrigger>
  );
}

const SubContent = styled(MenuPrimitive.SubContent)`
  ${menuContentStyles}
  transform-origin: var(--radix-context-menu-content-transform-origin);
`;

export function ContextMenuSubContent(props: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return (
    <MenuPrimitive.Portal>
      <SubContent {...props} />
    </MenuPrimitive.Portal>
  );
}

export const ContextMenuLabel = styled(MenuPrimitive.Label)`
  ${menuLabelStyles}
`;

export const ContextMenuSeparator = styled(MenuPrimitive.Separator)`
  ${menuSeparatorStyles}
`;

export const ContextMenuShortcut = MenuShortcut;
