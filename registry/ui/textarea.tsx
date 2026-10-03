import { styled } from "zerostyled";
import { fieldStyles } from "./input";

export const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 80px;
  padding: 8px 12px;
  line-height: 1.5;
  resize: vertical;
`;
