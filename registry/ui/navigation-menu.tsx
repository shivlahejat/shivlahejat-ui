"use client";

import type { ComponentProps } from "react";
import * as NavPrimitive from "@radix-ui/react-navigation-menu";
import { styled, css, keyframes } from "shivlahejat";
import { theme, focusRing, fadeIn, fadeOut } from "./theme";

const Root = styled(NavPrimitive.Root)`
  position: relative;
  z-index: 10;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  max-width: max-content;
`;

type NavigationMenuProps = ComponentProps<typeof NavPrimitive.Root> & {
  /** Render the shared viewport that panels animate inside. Set false to position each panel yourself. */
  viewport?: boolean;
};

export function NavigationMenu({ children, viewport = true, ...props }: NavigationMenuProps) {
  return (
    <Root data-viewport={viewport} {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </Root>
  );
}

export const NavigationMenuList = styled(NavPrimitive.List)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavigationMenuItem = styled(NavPrimitive.Item)`
  position: relative;
`;

/** Use with <NavigationMenuLink asChild> or the trigger to get the same look. */
export const navigationMenuTriggerStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 36px;
  width: max-content;
  padding: 0 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  background: ${theme.color.background};
  border: 0;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition:
    background-color 150ms,
    color 150ms;
  ${focusRing}
  &:hover,
  &[data-state="open"],
  &[data-active] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Trigger = styled(NavPrimitive.Trigger)`
  ${navigationMenuTriggerStyle}
  & > svg {
    width: 12px;
    height: 12px;
    margin-top: 1px;
    transition: transform 300ms;
  }
  &[data-state="open"] > svg {
    transform: rotate(180deg);
  }
`;

export function NavigationMenuTrigger({ children, ...props }: ComponentProps<typeof NavPrimitive.Trigger>) {
  return (
    <Trigger {...props}>
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Trigger>
  );
}

const enterFromRight = keyframes`from { opacity: 0; transform: translateX(52px); } to { opacity: 1; transform: none; }`;
const enterFromLeft = keyframes`from { opacity: 0; transform: translateX(-52px); } to { opacity: 1; transform: none; }`;
const exitToRight = keyframes`from { opacity: 1; transform: none; } to { opacity: 0; transform: translateX(52px); }`;
const exitToLeft = keyframes`from { opacity: 1; transform: none; } to { opacity: 0; transform: translateX(-52px); }`;
const scaleIn = keyframes`from { opacity: 0; transform: rotateX(-10deg) scale(0.95); } to { opacity: 1; transform: none; }`;
const scaleOut = keyframes`from { opacity: 1; transform: none; } to { opacity: 0; transform: rotateX(-10deg) scale(0.95); }`;

export const NavigationMenuContent = styled(NavPrimitive.Content)`
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  @media (min-width: 768px) {
    position: absolute;
    width: auto;
  }
  &[data-motion="from-start"] {
    animation: ${enterFromLeft} 250ms ease;
  }
  &[data-motion="from-end"] {
    animation: ${enterFromRight} 250ms ease;
  }
  &[data-motion="to-start"] {
    animation: ${exitToLeft} 250ms ease;
  }
  &[data-motion="to-end"] {
    animation: ${exitToRight} 250ms ease;
  }
  /* Without the shared viewport, each panel is its own popover. */
  [data-viewport="false"] & {
    top: 100%;
    margin-top: 6px;
    background: ${theme.color.popover};
    color: ${theme.color.popoverForeground};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.md};
    box-shadow: ${theme.shadow.md};
  }
`;

const ViewportPosition = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  perspective: 2000px;
`;

const Viewport = styled(NavPrimitive.Viewport)`
  position: relative;
  width: 100%;
  height: var(--radix-navigation-menu-viewport-height);
  margin-top: 6px;
  overflow: hidden;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  transform-origin: top center;
  transition:
    width 300ms ease,
    height 300ms ease;
  @media (min-width: 768px) {
    width: var(--radix-navigation-menu-viewport-width);
  }
  &[data-state="open"] {
    animation: ${scaleIn} 200ms ease;
  }
  &[data-state="closed"] {
    animation: ${scaleOut} 200ms ease;
  }
`;

export function NavigationMenuViewport(props: ComponentProps<typeof NavPrimitive.Viewport>) {
  return (
    <ViewportPosition>
      <Viewport {...props} />
    </ViewportPosition>
  );
}

export const NavigationMenuLink = styled(NavPrimitive.Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  font-size: 14px;
  color: inherit;
  text-decoration: none;
  border-radius: ${theme.radius.sm};
  outline: none;
  transition: background-color 150ms;
  ${focusRing}
  &:hover,
  &[data-active] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
`;

const IndicatorRoot = styled(NavPrimitive.Indicator)`
  top: 100%;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 6px;
  overflow: hidden;
  &[data-state="visible"] {
    animation: ${fadeIn} 200ms ease;
  }
  &[data-state="hidden"] {
    animation: ${fadeOut} 200ms ease;
  }
`;

const Arrow = styled.div`
  position: relative;
  top: 60%;
  width: 8px;
  height: 8px;
  background: ${theme.color.border};
  border-top-left-radius: 2px;
  transform: rotate(45deg);
`;

export function NavigationMenuIndicator(props: ComponentProps<typeof NavPrimitive.Indicator>) {
  return (
    <IndicatorRoot {...props}>
      <Arrow />
    </IndicatorRoot>
  );
}
