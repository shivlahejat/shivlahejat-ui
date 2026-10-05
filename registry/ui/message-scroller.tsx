"use client";

import type { ComponentProps } from "react";
import { MessageScroller as Primitive } from "@shadcn/react/message-scroller";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

export {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";

/**
 * Scroll container for a chat transcript. Behaviour comes from @shadcn/react:
 * new turns anchor near the top, streaming follows the bottom only while you're there,
 * saved threads open at the last turn, and prepending history keeps your place.
 */
export const MessageScrollerProvider = Primitive.Provider;

/** Fills its parent, so give the parent a height. */
export const MessageScroller = styled(Primitive.Root)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
`;

export const MessageScrollerViewport = styled(Primitive.Viewport)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  outline: none;
  &[data-pending-scroll] {
    visibility: hidden;
  }
  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${theme.color.ring};
  }
`;

export const MessageScrollerContent = styled(Primitive.Content)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

/** One row. Set scrollAnchor on user turns so each new turn lands near the top. */
export const MessageScrollerItem = styled(Primitive.Item)`
  content-visibility: auto;
  contain-intrinsic-size: auto 80px;
`;

const Floating = styled(Primitive.Button)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: ${theme.color.foreground};
  background: ${theme.color.background};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.full};
  box-shadow: ${theme.shadow.md};
  cursor: pointer;
  transform: translateX(-50%);
  transition:
    opacity 150ms,
    transform 150ms;
  ${focusRing}
  &[data-direction="start"] {
    top: 16px;
    bottom: auto;
  }
  &[inert],
  &[data-active="false"] {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) translateY(4px);
  }
  & svg {
    width: 16px;
    height: 16px;
  }
`;

/** Round "jump to latest" button. Hidden when there's nothing to scroll to. */
export function MessageScrollerButton({
  direction = "end",
  children,
  ...props
}: ComponentProps<typeof Primitive.Button>) {
  return (
    <Floating
      direction={direction}
      aria-label={direction === "end" ? "Scroll to latest message" : "Scroll to first message"}
      {...props}
    >
      {children ?? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ transform: direction === "start" ? "rotate(180deg)" : undefined }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      )}
    </Floating>
  );
}
