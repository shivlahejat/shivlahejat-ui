import { styled } from "shivlahejat";
import { theme } from "./theme";

/** Keyboard key: <Kbd>⌘</Kbd>. Group several with <KbdGroup>. */
export const Kbd = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  font-family: ${theme.font.sans};
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: ${theme.color.mutedForeground};
  background: ${theme.color.muted};
  border-radius: 4px;
  user-select: none;
  pointer-events: none;
  & svg {
    width: 12px;
    height: 12px;
  }
`;

export const KbdGroup = styled.kbd`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
`;
