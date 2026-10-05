import Link from "next/link";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/site/code-block";
import { components } from "@/lib/registry";
import CardDemo from "@/demos/card";
import CalendarDemo from "@/demos/calendar";
import ChartDemo from "@/demos/chart";
import FieldDemo from "@/demos/field";
import MessageScrollerDemo from "@/demos/message-scroller";
import DataTableDemo from "@/demos/data-table";
import ItemDemo from "@/demos/item";
import InputOTPDemo from "@/demos/input-otp";

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 760px;
  margin: 0 auto;
  padding: 72px 24px 40px;
  text-align: center;
  @media (max-width: 640px) {
    padding: 48px 16px 32px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(34px, 6vw, 56px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-wrap: balance;
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 600px;
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.color.mutedForeground};
  text-wrap: pretty;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const InstallBox = styled.div`
  width: 100%;
  max-width: 460px;
  text-align: left;
`;

const Showcase = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 24px 96px;
  columns: 3 340px;
  column-gap: 16px;
  @media (max-width: 640px) {
    padding: 16px 12px 64px;
  }
`;

const Tile = styled.div`
  display: flex;
  justify-content: center;
  break-inside: avoid;
  margin-bottom: 16px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  &[data-wide] {
    column-span: all;
  }
`;

export default function Home() {
  return (
    <main>
      <Hero>
        <Badge variant="secondary">{components.length} components · React 19 · Next.js 15+</Badge>
        <Title>Components you own, written with styled components.</Title>
        <Subtitle>
          Accessible, themeable components you copy into your Next.js app. They use a styled-components API
          that works in Server Components, with no style registry, no compiler plugin and no Tailwind.
        </Subtitle>
        <Actions>
          <Button as={Link} href="/docs/installation" size="lg">
            Get started
          </Button>
          <Button as={Link} href="/docs/components" size="lg" variant="outline">
            Browse components
          </Button>
        </Actions>
        <InstallBox>
          <CodeBlock code="npx shivlahejat-ui@latest init" lang="bash" />
        </InstallBox>
      </Hero>

      <Showcase aria-label="Examples">
        <Tile>
          <CardDemo />
        </Tile>
        <Tile>
          <MessageScrollerDemo />
        </Tile>
        <Tile>
          <CalendarDemo />
        </Tile>
        <Tile>
          <FieldDemo />
        </Tile>
        <Tile>
          <ChartDemo />
        </Tile>
        <Tile>
          <InputOTPDemo />
        </Tile>
        <Tile>
          <ItemDemo />
        </Tile>
        <Tile data-wide="">
          <DataTableDemo />
        </Tile>
      </Showcase>
    </main>
  );
}
