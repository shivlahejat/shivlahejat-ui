"use client";

import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "shivlahejat";
import { theme, fadeIn, fadeOut, focusRing } from "./theme";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

const contentIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;
const contentOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
`;

export const DialogOverlay = styled(DialogPrimitive.Overlay)`
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

const Content = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  width: calc(100% - 32px);
  max-width: 480px;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
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

const CloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: ${theme.radius.sm};
  background: transparent;
  color: ${theme.color.mutedForeground};
  cursor: pointer;
  &:hover {
    background: ${theme.color.accent};
    color: ${theme.color.foreground};
  }
  ${focusRing}
`;

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  /** Show the × button in the corner. */
  showClose?: boolean;
};

export function DialogContent({ children, showClose = true, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <Content {...props}>
        {children}
        {showClose && (
          <CloseButton aria-label="Close">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </CloseButton>
        )}
      </Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogHeader = styled.div`
  display: grid;
  gap: 6px;
  padding-right: 24px;
`;

export const DialogFooter = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  gap: 8px;
`;

export const DialogTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
`;

export const DialogDescription = styled(DialogPrimitive.Description)`
  margin: 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;
