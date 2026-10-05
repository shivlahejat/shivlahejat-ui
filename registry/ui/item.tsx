import { styled, css } from "shivlahejat";
import { theme, focusRing } from "./theme";

/**
 * A row of content: media, title, description and actions.
 * Render as a link with as="a" (or as={Link}).
 */
export const Item = styled.div({
  base: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    font-size: 14px;
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: ${theme.radius.md};
    transition: background-color 150ms;
    ${focusRing}
    &:is(a, button):hover {
      background: color-mix(in srgb, ${theme.color.accent} 60%, transparent);
    }
  `,
  variants: {
    variant: {
      default: "background: transparent;",
      outline: `border-color: ${theme.color.border};`,
      muted: `background: color-mix(in srgb, ${theme.color.muted} 60%, transparent);`,
    },
    size: {
      default: "padding: 16px; gap: 16px;",
      sm: "padding: 10px 16px; gap: 10px;",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export const ItemGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemSeparator = styled.div`
  height: 1px;
  margin: 0;
  background: ${theme.color.border};
`;

export const ItemMedia = styled.div({
  base: css`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: 8px;
    align-self: flex-start;
    & svg {
      width: 16px;
      height: 16px;
    }
  `,
  variants: {
    variant: {
      default: "background: transparent;",
      icon: css`
        width: 32px;
        height: 32px;
        background: ${theme.color.muted};
        border: 1px solid ${theme.color.border};
        border-radius: ${theme.radius.sm};
      `,
      image: css`
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: ${theme.radius.sm};
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `,
    },
  },
  defaultVariants: { variant: "default" },
});

export const ItemContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  font-weight: 500;
  line-height: 1.4;
`;

export const ItemDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.color.mutedForeground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: balance;
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const fullRow = `
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemHeader = styled.div({ base: fullRow });
export const ItemFooter = styled.div({ base: fullRow });
