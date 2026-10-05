"use client";

import type { ComponentProps } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { styled, keyframes } from "shivlahejat";
import { theme, fadeIn, fadeOut } from "./theme";
import { Button } from "./button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

const contentIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;
const contentOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
`;

export const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: ${theme.color.overlay};
  &[data-state="open"] {
    animation: ${fadeIn} 150ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${fadeOut} 120ms ease-in;
  }
`;

const Content = styled(AlertDialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  width: calc(100% - 32px);
  max-width: 440px;
  display: grid;
  gap: 16px;
  padding: 24px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.md};
  &:focus {
    outline: none;
  }
  &[data-state="open"] {
    animation: ${contentIn} 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${contentOut} 120ms ease-in;
  }
`;

export function AlertDialogContent(props: ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay />
      <Content {...props} />
    </AlertDialogPrimitive.Portal>
  );
}

export const AlertDialogHeader = styled.div`
  display: grid;
  gap: 6px;
`;

export const AlertDialogFooter = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  gap: 8px;
`;

export const AlertDialogTitle = styled(AlertDialogPrimitive.Title)`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
`;

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description)`
  margin: 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;

type ButtonProps = ComponentProps<typeof Button>;

/** Confirms the action. Takes Button's variant and size (default variant). */
export function AlertDialogAction({ variant, size, ...props }: ButtonProps) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button variant={variant} size={size} {...props} />
    </AlertDialogPrimitive.Action>
  );
}

/** Closes the dialog. Uses the outline Button by default. */
export function AlertDialogCancel({ variant = "outline", size, ...props }: ButtonProps) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button variant={variant} size={size} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
}
