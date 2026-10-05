import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
  &[data-align="end"] {
    flex-direction: row-reverse;
  }
`;

/**
 * One chat message: avatar + header + Bubble + footer.
 * align="end" mirrors the row for the current user's messages.
 */
export function Message({ align = "start", ...props }: ComponentProps<"div"> & { align?: "start" | "end" }) {
  return <Row data-align={align} {...props} />;
}

/** Consecutive messages from one sender, stacked tightly. */
export const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/**
 * Sits at the bottom of the row. In a group, give earlier messages an empty MessageAvatar
 * so their bubbles line up with the last one.
 */
export const MessageAvatar = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 32px;
  min-height: 1px;
  /* Line up with the bubble, not the footer under it. */
  [data-align]:has(> div > [data-message-footer]) > & {
    margin-bottom: 24px;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  [data-align="end"] > & {
    align-items: flex-end;
  }
  & > * {
    max-width: 100%;
  }
`;

/** Sender name etc. Always aligned to the start. */
export const MessageHeader = styled.div`
  align-self: flex-start;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.color.mutedForeground};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 20px;
  padding: 0 4px;
  font-size: 12px;
  color: ${theme.color.mutedForeground};
`;

/** Status ("Delivered") or actions. Follows the message's side. */
export function MessageFooter(props: ComponentProps<"div">) {
  return <Footer data-message-footer="" {...props} />;
}
