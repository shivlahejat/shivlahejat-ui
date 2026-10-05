import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { fieldStyles } from "./input";

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  & > svg {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    color: ${theme.color.mutedForeground};
    pointer-events: none;
  }
`;

const Control = styled.select`
  ${fieldStyles}
  height: 36px;
  min-width: 180px;
  padding: 0 32px 0 12px;
  appearance: none;
  cursor: pointer;
`;

/** The browser's own <select>, styled to match Input. Works without JavaScript. */
export function NativeSelect({ style, className, ...props }: ComponentProps<"select">) {
  return (
    <Wrapper style={style} className={className}>
      <Control {...props} />
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
    </Wrapper>
  );
}

export function NativeSelectOption(props: ComponentProps<"option">) {
  return <option {...props} />;
}

export function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup {...props} />;
}
