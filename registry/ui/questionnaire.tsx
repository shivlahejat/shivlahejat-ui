"use client";

import type { ComponentProps } from "react";
import { Questionnaire as Primitive } from "@shadcn/react/questionnaire";
import { styled, css } from "shivlahejat";
import { theme } from "./theme";
import { Button } from "./button";

export type {
  QuestionnaireItemDefinition,
  QuestionnaireItemStatus,
  QuestionnaireShortcutMode,
} from "@shadcn/react/questionnaire";

/*
 * Multi-step form, one question at a time. Behaviour (validation, focus, keyboard shortcuts,
 * skip, progress) comes from @shadcn/react; this file only adds styles.
 * Read answers in onSubmit with new FormData(e.currentTarget).
 */

/** Hidden parts keep the `hidden` attribute working even though we set `display`. */
const respectHidden = css`
  &[hidden] {
    display: none;
  }
`;

export const Questionnaire = styled(Primitive.Root)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const QuestionnaireProgress = styled(Primitive.Progress)`
  font-size: 13px;
  color: ${theme.color.mutedForeground};
  font-variant-numeric: tabular-nums;
`;

export const QuestionnaireItem = styled(Primitive.Item)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  ${respectHidden}
`;

export const QuestionnaireTitle = styled(Primitive.Title)`
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;

export const QuestionnaireDescription = styled(Primitive.Description)`
  margin: -6px 0 0;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;

export const QuestionnaireChoices = styled(Primitive.Choices)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChoiceRoot = styled(Primitive.Choice)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition:
    border-color 150ms,
    background-color 150ms;
  &:hover {
    background: ${theme.color.accent};
  }
  &[data-checked] {
    border-color: ${theme.color.primary};
    background: color-mix(in srgb, ${theme.color.primary} 7%, ${theme.color.background});
  }
  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &[data-invalid] {
    border-color: color-mix(in srgb, ${theme.color.destructive} 50%, transparent);
  }
  &:has(input:focus-visible) {
    outline: 2px solid ${theme.color.ring};
    outline-offset: 2px;
  }
`;

/* The native input is visually hidden; the indicator shows its state. */
const ChoiceInput = styled(Primitive.ChoiceInput)`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
`;

const Indicator = styled.span`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme.color.input};
  border-radius: ${theme.radius.full};
  [data-type="checkbox"] > & {
    border-radius: 4px;
  }
  [data-checked] > & {
    border-color: ${theme.color.primary};
    background: ${theme.color.primary};
    box-shadow: inset 0 0 0 3px ${theme.color.background};
  }
  [data-type="checkbox"][data-checked] > & {
    box-shadow: none;
  }
  & svg {
    display: none;
    width: 12px;
    height: 12px;
    color: ${theme.color.primaryForeground};
  }
  [data-type="checkbox"][data-checked] > & svg {
    display: block;
  }
`;

const ChoiceLabel = styled(Primitive.ChoiceLabel)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  & > span + span {
    font-size: 13px;
    color: ${theme.color.mutedForeground};
  }
`;

const ChoiceShortcut = styled(Primitive.ChoiceShortcut)`
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 500;
  color: ${theme.color.mutedForeground};
  background: ${theme.color.muted};
  border-radius: 4px;
  ${respectHidden}
`;

/** One answer. Children are the label (add a second <span> for a description). */
export function QuestionnaireChoice({ children, ...props }: ComponentProps<typeof Primitive.Choice>) {
  return (
    <ChoiceRoot {...props}>
      <ChoiceInput />
      <Indicator aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </Indicator>
      <ChoiceLabel>{children}</ChoiceLabel>
      <ChoiceShortcut />
    </ChoiceRoot>
  );
}

/** Free-text answer ("Other…"). */
export const QuestionnaireInput = styled(Primitive.Input)`
  height: 40px;
  padding: 0 12px;
  font: inherit;
  font-size: 14px;
  color: ${theme.color.foreground};
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-radius: ${theme.radius.md};
  &::placeholder {
    color: ${theme.color.mutedForeground};
  }
  &:focus-visible {
    outline: none;
    border-color: ${theme.color.ring};
    box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
  }
  &[data-invalid] {
    border-color: ${theme.color.destructive};
  }
`;

export const QuestionnaireError = styled(Primitive.Error)`
  margin: 0;
  font-size: 13px;
  color: ${theme.color.destructive};
  ${respectHidden}
`;

export const QuestionnaireActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

type NavProps = ComponentProps<typeof Primitive.Next> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg";
};

function navButton(Part: typeof Primitive.Next, label: string, defaultVariant: NavProps["variant"]) {
  function QuestionnaireNav({ variant = defaultVariant, size = "default", children, ...props }: NavProps) {
    return (
      <Part
        {...props}
        render={(renderProps) => (
          <Button
            {...renderProps}
            variant={variant}
            size={size}
            // Button sets display, so honour the hidden attribute explicitly.
            style={renderProps.hidden ? { display: "none" } : undefined}
          >
            {children ?? label}
          </Button>
        )}
      />
    );
  }
  return QuestionnaireNav;
}

export const QuestionnairePrevious = navButton(Primitive.Previous, "Back", "ghost");
export const QuestionnaireSkip = navButton(Primitive.Skip, "Skip", "outline");
export const QuestionnaireNext = navButton(Primitive.Next, "Next", "default");
export const QuestionnaireSubmit = navButton(Primitive.Submit, "Submit", "default");
