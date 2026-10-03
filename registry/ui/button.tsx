import { styled, css } from "zerostyled";
import { theme, focusRing } from "./theme";

export const Button = styled.button({
  base: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    transition:
      background-color 150ms,
      color 150ms,
      border-color 150ms;
    ${focusRing}
    &:disabled, &[aria-disabled="true"] {
      pointer-events: none;
      opacity: 0.5;
    }
    & svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  `,
  variants: {
    variant: {
      default: css`
        background: ${theme.color.primary};
        color: ${theme.color.primaryForeground};
        &:hover {
          background: color-mix(in srgb, ${theme.color.primary} 88%, black);
        }
      `,
      secondary: css`
        background: ${theme.color.secondary};
        color: ${theme.color.secondaryForeground};
        &:hover {
          background: color-mix(in srgb, ${theme.color.secondary} 85%, ${theme.color.foreground});
        }
      `,
      outline: css`
        background: ${theme.color.background};
        color: ${theme.color.foreground};
        border-color: ${theme.color.input};
        &:hover {
          background: ${theme.color.accent};
        }
      `,
      ghost: css`
        background: transparent;
        color: ${theme.color.foreground};
        &:hover {
          background: ${theme.color.accent};
        }
      `,
      destructive: css`
        background: ${theme.color.destructive};
        color: ${theme.color.destructiveForeground};
        &:hover {
          background: color-mix(in srgb, ${theme.color.destructive} 88%, black);
        }
      `,
      link: css`
        background: transparent;
        color: ${theme.color.primary};
        height: auto !important;
        padding: 0 !important;
        &:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `,
    },
    size: {
      default: "height: 36px; padding: 0 16px;",
      sm: "height: 32px; padding: 0 12px; font-size: 13px;",
      lg: "height: 44px; padding: 0 24px; font-size: 15px;",
      icon: "height: 36px; width: 36px; padding: 0;",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
