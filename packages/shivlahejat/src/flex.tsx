import * as React from "react";
import { styled } from "./styled.js";

type CSS = React.CSSProperties;

export interface FlexOwnProps {
  direction?: CSS["flexDirection"];
  $direction?: CSS["flexDirection"];
  alignItems?: CSS["alignItems"];
  $alignItems?: CSS["alignItems"];
  justifyContent?: CSS["justifyContent"];
  $justifyContent?: CSS["justifyContent"];
  wrap?: CSS["flexWrap"];
  $wrap?: CSS["flexWrap"];
  /** Space between children, e.g. 8 (px) or "1rem". */
  gap?: string | number;
  $gap?: string | number;
  fullWidth?: boolean;
  $fullWidth?: boolean;
  /**
   * Grid row: wraps children, removes their grow/shrink and applies negative
   * side margins of the theme's `general.gridGap` (or the `gridGap` prop).
   */
  grid?: boolean;
  $grid?: boolean;
  /** Overrides the theme's general.gridGap for this row. */
  gridGap?: string | number;
  /** Never forwarded to the DOM (kept for styled-components compatibility). */
  disabled?: boolean;
}

export type FlexProps<As extends React.ElementType = "div"> = FlexOwnProps & { as?: As } & Omit<
    React.ComponentPropsWithRef<As>,
    keyof FlexOwnProps | "as"
  >;

const FlexBase = styled.div({
  base: `
    display: flex;
    flex-direction: var(--sl-fd);
    align-items: var(--sl-ai);
    justify-content: var(--sl-jc);
    flex-wrap: var(--sl-fw);
    gap: var(--sl-gap);
  `,
  variants: {
    fullWidth: { true: "width: 100%;" },
    grid: {
      true: `
        flex-wrap: wrap;
        margin-left: calc(-1 * var(--sl-grid-gap));
        margin-right: calc(-1 * var(--sl-grid-gap));
        > div { flex-grow: 0; flex-shrink: 0; }
      `,
    },
  },
});

const px = (v: string | number | undefined) => (typeof v === "number" ? `${v}px` : v);

/**
 * Drop-in replacement for the common styled-components Flex helper.
 * Works in Server Components. Accepts both plain and $-prefixed props.
 *
 *   <Flex direction="column" alignItems="center" gap={12} fullWidth>
 *   <Flex grid>   → negative margins from createTheme({ general: { gridGap } })
 */
export function Flex<As extends React.ElementType = "div">(props: FlexProps<As>): React.ReactElement {
  const {
    direction,
    $direction,
    alignItems,
    $alignItems,
    justifyContent,
    $justifyContent,
    wrap,
    $wrap,
    gap,
    $gap,
    fullWidth,
    $fullWidth,
    grid,
    $grid,
    gridGap,
    disabled,
    style,
    ...rest
  } = props as FlexOwnProps & { style?: CSS } & Record<string, unknown>;

  // Every variable is always set on the element itself, so a nested Flex
  // never inherits its parent's direction or alignment.
  const cssVars = {
    "--sl-fd": $direction || direction || "row",
    "--sl-ai": $alignItems || alignItems || "flex-start",
    "--sl-jc": $justifyContent || justifyContent || "flex-start",
    "--sl-fw": $wrap || wrap || "nowrap",
    "--sl-gap": px($gap ?? gap) ?? "normal",
    "--sl-grid-gap": px(gridGap) ?? "var(--general-gridGap, 0px)",
  } as CSS;

  return React.createElement(FlexBase as React.ElementType, {
    ...rest,
    fullWidth: !!(fullWidth || $fullWidth),
    grid: !!(grid || $grid),
    style: { ...cssVars, ...style },
  });
}
