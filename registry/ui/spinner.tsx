import type { ComponentProps } from "react";
import { styled, keyframes } from "shivlahejat";

const spin = keyframes`to { transform: rotate(360deg); }`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  animation: ${spin} 0.8s linear infinite;
`;

/** Loading indicator. Inherits text color; size it with width/height. */
export function Spinner(props: ComponentProps<"svg">) {
  return (
    <Svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Svg>
  );
}
