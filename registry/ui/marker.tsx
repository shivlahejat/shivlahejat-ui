import { styled, css, keyframes } from "shivlahejat";
import { theme } from "./theme";

/**
 * Inline status or system note in a conversation: "Thinking…", "Explored 4 files", or a
 * labelled divider like "Today". Use role="status" for progress; as="a" to make it a link.
 */
export const Marker = styled.div({
  base: css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    font-size: 13px;
    color: ${theme.color.mutedForeground};
    text-decoration: none;
    &:is(a, button) {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 0;
      font: inherit;
      font-size: 13px;
    }
    &:is(a, button):hover {
      color: ${theme.color.foreground};
    }
  `,
  variants: {
    variant: {
      default: "",
      border: `padding-bottom: 8px; border-bottom: 1px solid ${theme.color.border};`,
      separator: css`
        justify-content: center;
        text-align: center;
        &::before,
        &::after {
          content: "";
          flex: 1;
          height: 1px;
          background: ${theme.color.border};
        }
      `,
    },
  },
  defaultVariants: { variant: "default" },
});

export const MarkerIcon = styled.span`
  display: flex;
  flex-shrink: 0;
  & svg {
    width: 14px;
    height: 14px;
  }
`;

export const MarkerContent = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const shimmerMove = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`;

/** Shimmer for text that is still streaming. Interpolate it in a styled block, or use MarkerShimmer. */
export const shimmer = css`
  color: transparent;
  background: linear-gradient(
      90deg,
      ${theme.color.mutedForeground} 0%,
      ${theme.color.mutedForeground} 40%,
      ${theme.color.foreground} 50%,
      ${theme.color.mutedForeground} 60%,
      ${theme.color.mutedForeground} 100%
    )
    0 0 / 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shimmerMove} 2s linear infinite;
`;

/** MarkerContent with the shimmer applied. */
export const MarkerShimmer = styled.span`
  min-width: 0;
  ${shimmer}
`;
