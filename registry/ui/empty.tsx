import { styled } from "shivlahejat";
import { theme } from "./theme";

/** Empty state: <Empty><EmptyHeader><EmptyMedia/><EmptyTitle/><EmptyDescription/></EmptyHeader><EmptyContent/></Empty> */
export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  min-width: 0;
  padding: 48px 24px;
  text-align: center;
  text-wrap: balance;
  border: 1px dashed ${theme.color.border};
  border-radius: ${theme.radius.lg};
`;

export const EmptyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 380px;
`;

export const EmptyMedia = styled.div({
  base: `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 8px;
    & svg { width: 24px; height: 24px; }
  `,
  variants: {
    variant: {
      default: "",
      icon: `
        width: 44px;
        height: 44px;
        color: ${theme.color.foreground};
        background: ${theme.color.muted};
        border-radius: ${theme.radius.lg};
        & svg { width: 22px; height: 22px; }
      `,
    },
  },
  defaultVariants: { variant: "default" },
});

export const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

export const EmptyDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.color.mutedForeground};
  & a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  & a:hover {
    color: ${theme.color.primary};
  }
`;

export const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 380px;
  font-size: 14px;
`;
