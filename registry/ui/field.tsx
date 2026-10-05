import type { ComponentProps, ReactNode } from "react";
import { styled, css } from "shivlahejat";
import { theme } from "./theme";

/** Groups related fields under a legend. */
export const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const FieldLegend = styled.legend({
  base: `margin-bottom: 12px; padding: 0; font-weight: 500;`,
  variants: {
    variant: {
      legend: "font-size: 16px;",
      label: "font-size: 14px;",
    },
  },
  defaultVariants: { variant: "legend" },
});

/** Stack of Fields. */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  container-type: inline-size;
`;

/**
 * One form field: label, control, description and error.
 * orientation="horizontal" puts the label beside the control (good for checkboxes and switches);
 * "responsive" switches to horizontal when the FieldGroup is wider than 480px.
 */
const FieldRoot = styled.div({
  base: css`
    display: flex;
    gap: 10px;
    width: 100%;
    &[data-invalid="true"] {
      color: ${theme.color.destructive};
    }
    &[data-disabled="true"] {
      opacity: 0.6;
    }
  `,
  variants: {
    orientation: {
      vertical: "flex-direction: column;",
      horizontal: css`
        flex-direction: row;
        align-items: center;
        & > label {
          flex: 1;
        }
        &:has(> [data-field-content]) {
          align-items: flex-start;
        }
      `,
      responsive: css`
        flex-direction: column;
        @container (min-width: 480px) {
          flex-direction: row;
          align-items: center;
          & > * {
            flex: 1;
          }
        }
      `,
    },
  },
  defaultVariants: { orientation: "vertical" },
});

type FieldProps = ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal" | "responsive";
};

export function Field({ orientation = "vertical", ...props }: FieldProps) {
  return <FieldRoot role="group" data-orientation={orientation} orientation={orientation} {...props} />;
}

/** Wraps label + description when they sit beside a control. */
export function FieldContent(props: ComponentProps<"div">) {
  return <Content data-field-content="" {...props} />;
}

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  line-height: 1.4;
`;

export const FieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  user-select: none;
  /* A label that wraps a whole Field becomes a selectable card. */
  &:has(> [data-orientation]) {
    width: 100%;
    padding: 16px;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.md};
  }
  &:has(> [data-orientation]):has([data-state="checked"]) {
    border-color: ${theme.color.primary};
    background: color-mix(in srgb, ${theme.color.primary} 6%, transparent);
  }
`;

export const FieldTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

export const FieldDescription = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.color.mutedForeground};
  & a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  & a:hover {
    color: ${theme.color.primary};
  }
`;

const SeparatorRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 20px;
  font-size: 13px;
  color: ${theme.color.mutedForeground};
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${theme.color.border};
  }
  &:empty {
    gap: 0;
  }
  &:empty::after {
    display: none;
  }
`;

/** Divider between fields, with optional text: <FieldSeparator>Or continue with</FieldSeparator> */
export function FieldSeparator(props: ComponentProps<"div">) {
  return <SeparatorRoot role="separator" {...props} />;
}

const ErrorText = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${theme.color.destructive};
  & ul {
    margin: 4px 0 0;
    padding-left: 16px;
  }
`;

type FieldErrorProps = ComponentProps<"div"> & {
  /** Works with react-hook-form, TanStack Form, Zod etc.: anything shaped { message?: string }. */
  errors?: Array<{ message?: string } | undefined>;
};

/** Renders children, or the messages from `errors`. Renders nothing when there is no error. */
export function FieldError({ children, errors, ...props }: FieldErrorProps) {
  let content: ReactNode = children;
  if (!content && errors?.length) {
    const messages = [...new Set(errors.map((e) => e?.message).filter(Boolean))] as string[];
    content =
      messages.length === 1 ? (
        messages[0]
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      );
  }
  if (!content) return null;
  return (
    <ErrorText role="alert" {...props}>
      {content}
    </ErrorText>
  );
}
