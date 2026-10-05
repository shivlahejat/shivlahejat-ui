"use client";

import type { ComponentProps } from "react";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled, css } from "shivlahejat";
import { theme, popIn, popOut } from "./theme";

/* Shared menu styles. Context Menu and Menubar import these too. */

export const menuContentStyles = css`
  z-index: 50;
  min-width: 180px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 4px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  &[data-state="open"] {
    animation: ${popIn} 120ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${popOut} 100ms ease-in;
  }
`;

export const menuItemStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font-size: 14px;
  border-radius: ${theme.radius.sm};
  cursor: default;
  user-select: none;
  outline: none;
  &[data-highlighted],
  &[data-state="open"] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
  &[data-inset] {
    padding-left: 32px;
  }
  & svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const menuItemVariants = {
  default: "",
  destructive: css`
    color: ${theme.color.destructive};
    &[data-highlighted] {
      color: ${theme.color.destructive};
      background: color-mix(in srgb, ${theme.color.destructive} 12%, transparent);
    }
  `,
};

/** Checkbox and radio items leave room on the left for the indicator. */
export const menuCheckItemStyles = css`
  ${menuItemStyles}
  padding-left: 32px;
`;

export const menuIndicatorStyles = css`
  position: absolute;
  left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

export const menuLabelStyles = css`
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.color.mutedForeground};
  &[data-inset] {
    padding-left: 32px;
  }
`;

export const menuSeparatorStyles = css`
  height: 1px;
  margin: 4px -4px;
  background: ${theme.color.border};
`;

export const MenuShortcut = styled.span`
  margin-left: auto;
  padding-left: 16px;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: ${theme.color.mutedForeground};
`;

export const checkIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const dotIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 8, height: 8 }}>
    <circle cx="12" cy="12" r="12" />
  </svg>
);

export const chevronRightIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ marginLeft: "auto" }}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* Dropdown Menu */

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuPortal = MenuPrimitive.Portal;
export const DropdownMenuSub = MenuPrimitive.Sub;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const Content = styled(MenuPrimitive.Content)`
  ${menuContentStyles}
  max-height: var(--radix-dropdown-menu-content-available-height);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
`;

export function DropdownMenuContent({
  sideOffset = 6,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <Content sideOffset={sideOffset} {...props} />
    </MenuPrimitive.Portal>
  );
}

export const DropdownMenuItem = styled(MenuPrimitive.Item)({
  base: menuItemStyles,
  variants: { variant: menuItemVariants },
  defaultVariants: { variant: "default" },
});

const CheckboxItem = styled(MenuPrimitive.CheckboxItem)`
  ${menuCheckItemStyles}
`;
const Indicator = styled.span`
  ${menuIndicatorStyles}
`;

export function DropdownMenuCheckboxItem({
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

const RadioItem = styled(MenuPrimitive.RadioItem)`
  ${menuCheckItemStyles}
`;

export function DropdownMenuRadioItem({
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
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

export function DropdownMenuSubTrigger({
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
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
`;

export function DropdownMenuSubContent(props: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return (
    <MenuPrimitive.Portal>
      <SubContent {...props} />
    </MenuPrimitive.Portal>
  );
}

export const DropdownMenuLabel = styled(MenuPrimitive.Label)`
  ${menuLabelStyles}
`;

export const DropdownMenuSeparator = styled(MenuPrimitive.Separator)`
  ${menuSeparatorStyles}
`;

export const DropdownMenuShortcut = MenuShortcut;
