"use client";

import { useContext, type ComponentProps } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { styled, keyframes } from "shivlahejat";
import { theme } from "./theme";

export { REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const Container = styled.div`
  display: flex;
  /* input-otp's own container */
  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &:has(input:disabled) {
    opacity: 0.5;
  }
`;

/** One-time code input. Put InputOTPGroup / InputOTPSlot children inside. */
export function InputOTP({ containerClassName, ...props }: ComponentProps<typeof OTPInput>) {
  return (
    <Container>
      <OTPInput containerClassName={containerClassName} {...props} />
    </Container>
  );
}

export const InputOTPGroup = styled.div`
  display: flex;
  align-items: center;
`;

const blink = keyframes`
  0%, 70%, 100% { opacity: 1; }
  20%, 50% { opacity: 0; }
`;

const Slot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-left-width: 0;
  transition:
    border-color 150ms,
    box-shadow 150ms;
  &:first-child {
    border-left-width: 1px;
    border-radius: ${theme.radius.md} 0 0 ${theme.radius.md};
  }
  &:last-child {
    border-radius: 0 ${theme.radius.md} ${theme.radius.md} 0;
  }
  &[data-active="true"] {
    z-index: 1;
    border-color: ${theme.color.ring};
    box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
  }
  [aria-invalid="true"] & {
    border-color: ${theme.color.destructive};
  }
`;

const Caret = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &::after {
    content: "";
    width: 1px;
    height: 16px;
    background: ${theme.color.foreground};
    animation: ${blink} 1s ease-out infinite;
  }
`;

export function InputOTPSlot({ index, ...props }: ComponentProps<"div"> & { index: number }) {
  const ctx = useContext(OTPInputContext);
  const slot = ctx?.slots[index];
  return (
    <Slot data-active={slot?.isActive ?? false} {...props}>
      {slot?.char}
      {slot?.hasFakeCaret && <Caret />}
    </Slot>
  );
}

const Dash = styled.div`
  display: flex;
  color: ${theme.color.mutedForeground};
  & svg {
    width: 16px;
    height: 16px;
  }
`;

export function InputOTPSeparator(props: ComponentProps<"div">) {
  return (
    <Dash role="separator" {...props}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
      </svg>
    </Dash>
  );
}
