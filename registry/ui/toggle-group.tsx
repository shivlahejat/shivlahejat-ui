"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { toggleConfig } from "./toggle";

/* Items join into one segmented control. */
const Root = styled(ToggleGroupPrimitive.Root)`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: ${theme.radius.md};
  & > * {
    border-radius: 0;
  }
  & > *:first-child {
    border-top-left-radius: ${theme.radius.md};
    border-bottom-left-radius: ${theme.radius.md};
  }
  & > *:last-child {
    border-top-right-radius: ${theme.radius.md};
    border-bottom-right-radius: ${theme.radius.md};
  }
  & > * + *[data-variant="outline"] {
    border-left-width: 0;
  }
`;

/** type="single" or type="multiple". */
export function ToggleGroup(props: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  // Radix's props are a union (single | multiple) that the styled wrapper's types flatten, hence the cast.
  return <Root {...(props as React.ComponentProps<typeof Root>)} />;
}

const Item = styled(ToggleGroupPrimitive.Item)(toggleConfig);

export function ToggleGroupItem(props: React.ComponentProps<typeof Item>) {
  return <Item data-variant={props.variant ?? "default"} {...props} />;
}
