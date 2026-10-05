import { styled, keyframes } from "shivlahejat";
import { theme } from "./theme";

const pulse = keyframes`
  50% { opacity: 0.5; }
`;

/** Placeholder while content loads. Size it with style or width/height. */
export const Skeleton = styled.div`
  background: ${theme.color.muted};
  border-radius: ${theme.radius.md};
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
