import { styled } from "shivlahejat";

export const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  user-select: none;
  &:has(+ :disabled),
  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
