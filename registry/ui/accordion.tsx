"use client";

import type { ComponentProps } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled, keyframes } from "shivlahejat";
import { theme, focusRing } from "./theme";

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;
const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

const Root = styled(AccordionPrimitive.Root)`
  width: 100%;
`;

/** type="single" (with optional collapsible) or type="multiple". */
export function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  // Radix's props are a union (single | multiple) that the styled wrapper's types flatten, hence the cast.
  return <Root {...(props as ComponentProps<typeof Root>)} />;
}

export const AccordionItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid ${theme.color.border};
  &:last-child {
    border-bottom: 0;
  }
`;

const Header = styled(AccordionPrimitive.Header)`
  display: flex;
  margin: 0;
`;

const Trigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  ${focusRing}
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  & > svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: ${theme.color.mutedForeground};
    transition: transform 200ms;
  }
  &[data-state="open"] > svg {
    transform: rotate(180deg);
  }
`;

export function AccordionTrigger({ children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <Header>
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
    </Header>
  );
}

const Content = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 14px;
  &[data-state="open"] {
    animation: ${slideDown} 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${slideUp} 200ms ease-out;
  }
`;

const ContentInner = styled.div`
  padding-bottom: 16px;
`;

export function AccordionContent({ children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <Content {...props}>
      <ContentInner>{children}</ContentInner>
    </Content>
  );
}
