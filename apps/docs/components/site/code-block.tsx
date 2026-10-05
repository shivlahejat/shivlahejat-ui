import { createHighlighter, type Highlighter } from "shiki";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { CopyButton } from "./copy-button";

let highlighter: Promise<Highlighter> | undefined;
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "bash", "json", "css"],
  });
  return highlighter;
}

const Frame = styled.div`
  position: relative;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  background: ${theme.color.muted};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  & pre {
    margin: 0;
    padding: 16px;
    overflow: auto;
    max-height: var(--code-max-height, none);
    font-family: ${theme.font.mono};
    line-height: 1.65;
    background: transparent !important;
  }
  & code {
    font-family: inherit;
  }
  /* Shiki renders both themes as CSS variables; pick one per colour scheme. */
  & .shiki span {
    color: var(--shiki-light);
  }
  .dark & .shiki span,
  [data-theme="dark"] & .shiki span {
    color: var(--shiki-dark);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 48px 0 16px;
  font-family: ${theme.font.mono};
  font-size: 12px;
  color: ${theme.color.mutedForeground};
  border-bottom: 1px solid ${theme.color.border};
`;

const CopyCorner = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 1;
`;

type CodeBlockProps = {
  code: string;
  lang?: "tsx" | "bash" | "json" | "css";
  title?: string;
  /** Scroll long files instead of showing them in full. */
  maxHeight?: number;
};

/** Highlighted at build time, so it ships no highlighter to the browser. */
export async function CodeBlock({ code, lang = "tsx", title, maxHeight }: CodeBlockProps) {
  const html = (await getHighlighter()).codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
  return (
    <Frame style={maxHeight ? ({ "--code-max-height": `${maxHeight}px` } as React.CSSProperties) : undefined}>
      {title && <Title>{title}</Title>}
      <CopyCorner>
        <CopyButton value={code} />
      </CopyCorner>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Frame>
  );
}
