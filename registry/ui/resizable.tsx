"use client";

import type { ComponentProps } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

const GroupRoot = styled(Group)`
  display: flex;
  width: 100%;
  height: 100%;
  &[data-orientation="vertical"] {
    flex-direction: column;
  }
`;

/** orientation="horizontal" (side by side) or "vertical" (stacked). */
export function ResizablePanelGroup({ orientation = "horizontal", ...props }: ComponentProps<typeof Group>) {
  return <GroupRoot orientation={orientation} data-orientation={orientation} {...props} />;
}

/** defaultSize / minSize: numbers are pixels, strings like "30%" or "30" are percentages. */
export const ResizablePanel = Panel;

const Handle = styled(Separator)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.color.border};
  outline: none;
  ${focusRing}
  &[aria-orientation="vertical"] {
    width: 1px;
  }
  &[aria-orientation="horizontal"] {
    height: 1px;
  }
  /* Bigger hit area than the 1px line. */
  &::after {
    content: "";
    position: absolute;
    inset: 0 -4px;
  }
  &[aria-orientation="horizontal"]::after {
    inset: -4px 0;
  }
`;

const Grip = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 16px;
  background: ${theme.color.border};
  border: 1px solid ${theme.color.border};
  border-radius: 3px;
  & svg {
    width: 10px;
    height: 10px;
  }
  [aria-orientation="horizontal"] > & {
    width: 16px;
    height: 12px;
    transform: rotate(90deg);
  }
`;

type HandleProps = ComponentProps<typeof Separator> & {
  /** Show a small grip in the middle of the handle. */
  withHandle?: boolean;
};

export function ResizableHandle({ withHandle, ...props }: HandleProps) {
  return (
    <Handle {...props}>
      {withHandle && (
        <Grip>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
          </svg>
        </Grip>
      )}
    </Handle>
  );
}
