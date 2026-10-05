import type { ReactNode } from "react";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";

const PreviewFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 360px;
  padding: 48px 24px;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  @media (max-width: 640px) {
    padding: 32px 12px;
  }
  /* Full-page examples (iframes) fill the frame. */
  &:has(> iframe) {
    padding: 0;
    border: 0;
  }
`;

/** Preview / Code tabs, like every component page. */
export function ComponentPreview({ code, children }: { code: string; children: ReactNode }) {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <PreviewFrame>{children}</PreviewFrame>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} maxHeight={560} />
      </TabsContent>
    </Tabs>
  );
}

const managers = [
  ["pnpm", (cmd: string) => `pnpm dlx ${cmd}`],
  ["npm", (cmd: string) => `npx ${cmd}`],
  ["yarn", (cmd: string) => `yarn dlx ${cmd}`],
  ["bun", (cmd: string) => `bunx --bun ${cmd}`],
] as const;

const installers = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
} as const;

/** A CLI command shown for npm, pnpm, yarn and bun. */
export function CommandTabs({ command }: { command: string }) {
  return (
    <Tabs defaultValue="pnpm">
      <TabsList>
        {managers.map(([pm]) => (
          <TabsTrigger key={pm} value={pm}>
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map(([pm, run]) => (
        <TabsContent key={pm} value={pm}>
          <CodeBlock code={run(command)} lang="bash" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

/** "npm install x y" for each package manager. */
export function InstallTabs({ packages }: { packages: string[] }) {
  return (
    <Tabs defaultValue="pnpm">
      <TabsList>
        {managers.map(([pm]) => (
          <TabsTrigger key={pm} value={pm}>
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map(([pm]) => (
        <TabsContent key={pm} value={pm}>
          <CodeBlock code={`${installers[pm]} ${packages.join(" ")}`} lang="bash" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

const StepList = styled.ol`
  display: grid;
  gap: 28px;
  margin: 0;
  padding: 0 0 0 28px !important;
  list-style: none;
  counter-reset: step;
  border-left: 1px solid ${theme.color.border};
  margin-left: 12px !important;
  & > li {
    position: relative;
    min-width: 0;
    counter-increment: step;
  }
  & > li + li {
    margin-top: 0 !important;
  }
  & > li::before {
    content: counter(step);
    position: absolute;
    top: -2px;
    left: -42px;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    font-size: 13px;
    font-weight: 600;
    background: ${theme.color.muted};
    border: 4px solid ${theme.color.background};
    border-radius: 999px;
    box-sizing: content-box;
    margin-left: -4px;
  }
  & > li > h3 {
    margin: 0 0 10px !important;
    font-size: 15px;
  }
`;

/** Numbered steps with a line down the left. Each child is one <li>. */
export function Steps({ children }: { children: ReactNode }) {
  return <StepList>{children}</StepList>;
}
