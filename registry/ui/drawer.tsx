"use client";

import type { ComponentProps } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { styled } from "shivlahejat";
import { theme } from "./theme";

/** A swipeable panel from the bottom (or any edge with `direction`). Built on vaul. */
export function Drawer(props: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root {...props} />;
}

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

export const DrawerOverlay = styled(DrawerPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: ${theme.color.overlay};
`;

const Content = styled(DrawerPrimitive.Content)`
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  height: auto;
  background: ${theme.color.background};
  color: ${theme.color.foreground};
  outline: none;
  &[data-vaul-drawer-direction="bottom"] {
    inset: auto 0 0 0;
    max-height: 80vh;
    margin-top: 96px;
    border-top: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
  }
  &[data-vaul-drawer-direction="top"] {
    inset: 0 0 auto 0;
    max-height: 80vh;
    margin-bottom: 96px;
    border-bottom: 1px solid ${theme.color.border};
    border-radius: 0 0 ${theme.radius.lg} ${theme.radius.lg};
  }
  &[data-vaul-drawer-direction="right"] {
    inset: 0 0 0 auto;
    width: 75%;
    max-width: 384px;
    border-left: 1px solid ${theme.color.border};
  }
  &[data-vaul-drawer-direction="left"] {
    inset: 0 auto 0 0;
    width: 75%;
    max-width: 384px;
    border-right: 1px solid ${theme.color.border};
  }
`;

const Handle = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 6px;
  margin: 16px auto 0;
  background: ${theme.color.muted};
  border-radius: ${theme.radius.full};
  display: none;
  [data-vaul-drawer-direction="bottom"] > & {
    display: block;
  }
`;

export function DrawerContent({ children, ...props }: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />
      <Content {...props}>
        <Handle aria-hidden="true" />
        {children}
      </Content>
    </DrawerPrimitive.Portal>
  );
}

export const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  [data-vaul-drawer-direction="bottom"] > &,
  [data-vaul-drawer-direction="top"] > & {
    text-align: center;
  }
`;

export const DrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding: 16px;
`;

export const DrawerTitle = styled(DrawerPrimitive.Title)`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const DrawerDescription = styled(DrawerPrimitive.Description)`
  margin: 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;
