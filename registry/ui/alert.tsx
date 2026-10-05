import { styled, css } from "shivlahejat";
import { theme } from "./theme";

/** Put an optional <svg> icon first; title and description line up beside it. */
export const Alert = styled.div({
  base: css`
    position: relative;
    display: grid;
    grid-template-columns: 0 1fr;
    align-items: start;
    row-gap: 2px;
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.lg};
    &:has(> svg) {
      grid-template-columns: 16px 1fr;
      column-gap: 12px;
    }
    & > svg {
      grid-row: span 2;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      color: currentColor;
    }
  `,
  variants: {
    variant: {
      default: css`
        background: ${theme.color.card};
        color: ${theme.color.cardForeground};
      `,
      destructive: css`
        background: ${theme.color.card};
        color: ${theme.color.destructive};
        border-color: color-mix(in srgb, ${theme.color.destructive} 40%, transparent);
      `,
    },
  },
  defaultVariants: { variant: "default" },
});

export const AlertTitle = styled.div`
  grid-column-start: 2;
  font-weight: 500;
  line-height: 1.4;
`;

export const AlertDescription = styled.div`
  grid-column-start: 2;
  color: ${theme.color.mutedForeground};
  line-height: 1.5;
  & p {
    margin: 0;
  }
`;
