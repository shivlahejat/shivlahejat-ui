import type { ComponentProps } from "react";
import { styled, css } from "shivlahejat";
import { theme, focusRing } from "./theme";

/**
 * The framed surface of a chat message. Put avatars, names and actions in Message, not here.
 * align="end" pushes it to the right (usually the current user).
 */
const BubbleRoot = styled.div({
  base: css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: fit-content;
    max-width: 80%;
    min-width: 0;
    &[data-align="end"] {
      align-self: flex-end;
      margin-left: auto;
    }
    &:has(> [data-side="top"]) {
      margin-top: 12px;
    }
    &:has(> [data-side="bottom"]) {
      margin-bottom: 12px;
    }
  `,
  variants: {
    variant: {
      default: `--bubble-bg: ${theme.color.primary}; --bubble-fg: ${theme.color.primaryForeground};`,
      secondary: `--bubble-bg: ${theme.color.secondary}; --bubble-fg: ${theme.color.secondaryForeground};`,
      muted: `--bubble-bg: ${theme.color.muted}; --bubble-fg: ${theme.color.foreground};`,
      tinted: `--bubble-bg: color-mix(in srgb, ${theme.color.primary} 12%, ${theme.color.background}); --bubble-fg: ${theme.color.foreground};`,
      outline: `--bubble-bg: transparent; --bubble-fg: ${theme.color.foreground}; --bubble-border: ${theme.color.border};`,
      ghost: `--bubble-bg: transparent; --bubble-fg: ${theme.color.foreground}; --bubble-pad: 0; max-width: 100%; width: 100%;`,
      destructive: `--bubble-bg: color-mix(in srgb, ${theme.color.destructive} 12%, ${theme.color.background}); --bubble-fg: ${theme.color.destructive}; --bubble-border: color-mix(in srgb, ${theme.color.destructive} 35%, transparent);`,
    },
  },
  defaultVariants: { variant: "default" },
});

type BubbleProps = ComponentProps<typeof BubbleRoot> & { align?: "start" | "end" };

export function Bubble({ align = "start", ...props }: BubbleProps) {
  return <BubbleRoot data-align={align} {...props} />;
}

/** The text. Use as="button" or as="a" to make the bubble interactive. */
export const BubbleContent = styled.div`
  padding: var(--bubble-pad, 8px 12px);
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  text-decoration: none;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  color: var(--bubble-fg);
  background: var(--bubble-bg);
  border: 1px solid var(--bubble-border, transparent);
  border-radius: 18px;
  [data-align="start"] > & {
    border-bottom-left-radius: 6px;
  }
  [data-align="end"] > & {
    border-bottom-right-radius: 6px;
  }
  &:is(button, a) {
    cursor: pointer;
  }
  &:is(button, a):hover {
    filter: brightness(0.96);
  }
  ${focusRing}
`;

const Reactions = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2px;
  height: 24px;
  padding: 0 6px;
  font-size: 12px;
  background: ${theme.color.background};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.full};
  box-shadow: ${theme.shadow.sm};
  &[data-side="bottom"] {
    bottom: -14px;
  }
  &[data-side="top"] {
    top: -14px;
  }
  &[data-align="end"] {
    right: 8px;
  }
  &[data-align="start"] {
    left: 8px;
  }
`;

type BubbleReactionsProps = ComponentProps<"div"> & {
  side?: "top" | "bottom";
  align?: "start" | "end";
};

/** Emoji reactions overlapping the bubble's edge. Add role="img" aria-label="Reactions: …" when static. */
export function BubbleReactions({ side = "bottom", align = "end", ...props }: BubbleReactionsProps) {
  return <Reactions data-side={side} data-align={align} {...props} />;
}

/** Consecutive bubbles from the same sender. Set align on each Bubble. */
export const BubbleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
