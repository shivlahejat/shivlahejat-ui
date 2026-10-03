import { styled, css } from "zerostyled";
import { theme } from "./theme";

export const Badge = styled.span({
  base: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: ${theme.radius.full};
  `,
  variants: {
    variant: {
      default: css`
        background: ${theme.color.primary};
        color: ${theme.color.primaryForeground};
      `,
      secondary: css`
        background: ${theme.color.secondary};
        color: ${theme.color.secondaryForeground};
      `,
      outline: css`
        color: ${theme.color.foreground};
        border-color: ${theme.color.border};
      `,
      destructive: css`
        background: ${theme.color.destructive};
        color: ${theme.color.destructiveForeground};
      `,
    },
  },
  defaultVariants: { variant: "default" },
});
