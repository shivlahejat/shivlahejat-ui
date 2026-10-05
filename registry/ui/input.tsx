import { styled, css } from "shivlahejat";
import { theme } from "./theme";

export const fieldStyles = css`
  display: block;
  width: 100%;
  font: inherit;
  font-size: 14px;
  color: ${theme.color.foreground};
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-radius: ${theme.radius.md};
  transition:
    border-color 150ms,
    box-shadow 150ms;
  &::placeholder {
    color: ${theme.color.mutedForeground};
  }
  &:focus-visible {
    outline: none;
    border-color: ${theme.color.ring};
    box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &[aria-invalid="true"] {
    border-color: ${theme.color.destructive};
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.destructive} 25%, transparent);
    }
  }
`;

export const Input = styled.input`
  ${fieldStyles}
  height: 36px;
  padding: 0 12px;
  &[type="file"] {
    padding: 6px 12px;
  }
`;
