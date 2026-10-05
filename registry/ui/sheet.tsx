"use client";

import type { ComponentProps } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { styled, css, keyframes } from "shivlahejat";
import { theme, fadeIn, fadeOut, focusRing } from "./theme";

/** A Dialog that slides in from an edge of the screen. */
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

const slide = (from: string) => ({
  in: keyframes`from { transform: ${from}; } to { transform: none; }`,
  out: keyframes`from { transform: none; } to { transform: ${from}; }`,
});
const right = slide("translateX(100%)");
const left = slide("translateX(-100%)");
const top = slide("translateY(-100%)");
const bottom = slide("translateY(100%)");

const motion = (k: ReturnType<typeof slide>) => css`
  &[data-state="open"] {
    animation: ${k.in} 300ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  &[data-state="closed"] {
    animation: ${k.out} 200ms ease-in;
  }
`;

export const SheetOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: ${theme.color.overlay};
  &[data-state="open"] {
    animation: ${fadeIn} 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${fadeOut} 150ms ease-in;
  }
`;

const Content = styled(SheetPrimitive.Content)({
  base: css`
    position: fixed;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${theme.color.background};
    color: ${theme.color.foreground};
    box-shadow: ${theme.shadow.md};
    overflow-y: auto;
    &:focus {
      outline: none;
    }
  `,
  variants: {
    side: {
      right: css`
        inset: 0 0 0 auto;
        width: 75%;
        max-width: 384px;
        border-left: 1px solid ${theme.color.border};
        ${motion(right)}
      `,
      left: css`
        inset: 0 auto 0 0;
        width: 75%;
        max-width: 384px;
        border-right: 1px solid ${theme.color.border};
        ${motion(left)}
      `,
      top: css`
        inset: 0 0 auto 0;
        max-height: 90dvh;
        border-bottom: 1px solid ${theme.color.border};
        ${motion(top)}
      `,
      bottom: css`
        inset: auto 0 0 0;
        max-height: 90dvh;
        border-top: 1px solid ${theme.color.border};
        ${motion(bottom)}
      `,
    },
  },
  defaultVariants: { side: "right" },
});

const CloseButton = styled(SheetPrimitive.Close)`
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

type SheetContentProps = ComponentProps<typeof Content> & {
  /** Show the × button in the corner. */
  showClose?: boolean;
};

export function SheetContent({ children, showClose = true, ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
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
    </SheetPrimitive.Portal>
  );
}

export const SheetHeader = styled.div`
  display: grid;
  gap: 6px;
  padding: 16px 48px 0 16px;
`;

export const SheetFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding: 16px;
`;

export const SheetTitle = styled(SheetPrimitive.Title)`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const SheetDescription = styled(SheetPrimitive.Description)`
  margin: 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;
