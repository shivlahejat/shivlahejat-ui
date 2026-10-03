import { styled, css } from "zerostyled";
import { theme } from "./theme";

/** <Heading size="xl" as="h1"> — size and element are independent. */
export const Heading = styled.h2({
  base: css`
    margin: 0;
    font-weight: 650;
    letter-spacing: -0.02em;
    color: ${theme.color.foreground};
    text-wrap: balance;
  `,
  variants: {
    size: {
      xl: "font-size: clamp(32px, 5vw, 48px); line-height: 1.05; letter-spacing: -0.035em;",
      lg: "font-size: 28px; line-height: 1.15;",
      md: "font-size: 20px; line-height: 1.25;",
      sm: "font-size: 16px; line-height: 1.35;",
    },
  },
  defaultVariants: { size: "lg" },
});

export const Text = styled.p({
  base: css`
    margin: 0;
    text-wrap: pretty;
  `,
  variants: {
    variant: {
      default: "",
      muted: css`
        color: ${theme.color.mutedForeground};
      `,
      lead: css`
        font-size: 18px;
        color: ${theme.color.mutedForeground};
      `,
      small: "font-size: 13px; line-height: 1.4;",
    },
  },
  defaultVariants: { variant: "default" },
});

export const InlineCode = styled.code`
  font-family: ${theme.font.mono};
  font-size: 0.875em;
  padding: 2px 6px;
  border-radius: ${theme.radius.sm};
  background: ${theme.color.muted};
`;
