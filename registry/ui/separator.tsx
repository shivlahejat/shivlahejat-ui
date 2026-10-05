import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";

const Line = styled.div({
  base: `flex-shrink: 0; background: ${theme.color.border};`,
  variants: {
    orientation: {
      horizontal: "height: 1px; width: 100%;",
      vertical: "width: 1px; align-self: stretch;",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

type SeparatorProps = Omit<ComponentProps<"div">, "children"> & {
  orientation?: "horizontal" | "vertical";
  /** Purely visual by default. Set false if it separates meaningful content. */
  decorative?: boolean;
};

export function Separator({ orientation = "horizontal", decorative = true, ...props }: SeparatorProps) {
  return (
    <Line
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      orientation={orientation}
      {...props}
    />
  );
}
