import type { ComponentProps } from "react";
import { styled, css } from "shivlahejat";
import { theme, focusRing } from "./theme";
import { Button } from "./button";
import { shimmer } from "./marker";

type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";

const Root = styled.div({
  base: css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    max-width: 100%;
    font-size: 14px;
    background: ${theme.color.background};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.lg};
    &[data-state="error"] {
      color: ${theme.color.destructive};
      border-color: color-mix(in srgb, ${theme.color.destructive} 45%, transparent);
      background: color-mix(in srgb, ${theme.color.destructive} 6%, ${theme.color.background});
    }
    &[data-orientation="vertical"] {
      flex-direction: column;
      align-items: stretch;
      width: 176px;
      padding: 6px;
    }
  `,
  variants: {
    size: {
      default: "padding: 8px; --media: 40px;",
      sm: "padding: 6px; --media: 32px; font-size: 13px;",
      xs: "padding: 4px 8px 4px 4px; --media: 24px; font-size: 12px;",
    },
  },
  defaultVariants: { size: "default" },
});

type AttachmentProps = ComponentProps<typeof Root> & {
  state?: AttachmentState;
  orientation?: "horizontal" | "vertical";
};

/** A file or image chip: media, name, details and actions. Shows upload progress via `state`. */
export function Attachment({
  state = "done",
  orientation = "horizontal",
  size = "default",
  ...props
}: AttachmentProps) {
  const busy = state === "uploading" || state === "processing";
  return (
    <Root
      data-state={state}
      data-orientation={orientation}
      data-size={size}
      size={size}
      aria-busy={busy || undefined}
      {...props}
    />
  );
}

export const AttachmentMedia = styled.div({
  base: css`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--media);
    height: var(--media);
    overflow: hidden;
    border-radius: ${theme.radius.md};
    & svg {
      width: 16px;
      height: 16px;
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    [data-orientation="vertical"] > & {
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 3;
    }
  `,
  variants: {
    variant: {
      icon: `background: ${theme.color.muted}; color: ${theme.color.mutedForeground};`,
      image: `background: ${theme.color.muted};`,
    },
  },
  defaultVariants: { variant: "icon" },
});

export const AttachmentContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  [data-orientation="vertical"] > & {
    padding: 0 4px 2px;
  }
`;

export const AttachmentTitle = styled.div`
  overflow: hidden;
  font-weight: 500;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
  [data-state="uploading"] &,
  [data-state="processing"] & {
    ${shimmer}
  }
`;

export const AttachmentDescription = styled.div`
  overflow: hidden;
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.color.mutedForeground};
  [data-state="error"] & {
    color: inherit;
  }
  [data-size="xs"] & {
    display: none;
  }
`;

export const AttachmentActions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  [data-orientation="vertical"] > & {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

/** A small ghost icon Button. Always give it an aria-label. */
export function AttachmentAction({ variant = "ghost", style, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      style={{ width: 24, height: 24, borderRadius: 6, ...style }}
      {...props}
    />
  );
}

/**
 * Invisible button covering the card, e.g. to open a preview.
 * Actions stay clickable above it. Use as="a" for a link, or wrap with <DialogTrigger asChild>.
 */
export const AttachmentTrigger = styled.button`
  position: absolute;
  inset: 0;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: inherit;
  cursor: pointer;
  ${focusRing}
`;

/** A horizontally scrolling row of attachments. */
export const AttachmentGroup = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  mask-image: linear-gradient(to right, black calc(100% - 24px), transparent);
  & > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  &:focus-visible {
    outline: 2px solid ${theme.color.ring};
    outline-offset: 2px;
  }
`;
