import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";

const Group = styled.div({
  base: `
    display: flex;
    align-items: stretch;
    width: fit-content;
    & > * { border-radius: 0; }
    & > *:focus-visible { position: relative; z-index: 1; }
  `,
  variants: {
    orientation: {
      horizontal: `
        & > *:first-child { border-top-left-radius: ${theme.radius.md}; border-bottom-left-radius: ${theme.radius.md}; }
        & > *:last-child { border-top-right-radius: ${theme.radius.md}; border-bottom-right-radius: ${theme.radius.md}; }
        & > * + * { border-left-width: 0; }
      `,
      vertical: `
        flex-direction: column;
        & > *:first-child { border-top-left-radius: ${theme.radius.md}; border-top-right-radius: ${theme.radius.md}; }
        & > *:last-child { border-bottom-left-radius: ${theme.radius.md}; border-bottom-right-radius: ${theme.radius.md}; }
        & > * + * { border-top-width: 0; }
      `,
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

type ButtonGroupProps = ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" };

/** Joins Buttons, Inputs and Selects into one control. Nest groups to add gaps. */
export function ButtonGroup({ orientation = "horizontal", ...props }: ButtonGroupProps) {
  return <Group role="group" data-orientation={orientation} orientation={orientation} {...props} />;
}

/** Plain text segment, e.g. a "https://" prefix. */
export const ButtonGroupText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.color.mutedForeground};
  background: ${theme.color.muted};
  border: 1px solid ${theme.color.input};
  & svg {
    width: 16px;
    height: 16px;
  }
`;

/** Thin divider between buttons that have no border of their own. */
export const ButtonGroupSeparator = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  width: 1px;
  background: ${theme.color.input};
  [data-orientation="vertical"] > & {
    width: auto;
    height: 1px;
  }
`;
