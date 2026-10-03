import { styled, css, vars, createTheme } from "../src/index.js";

const theme = createTheme({ color: { primary: "#000" } });
const Button = styled.button({
  base: css`
    color: ${theme.color.primary};
  `,
  variants: { size: { sm: "", lg: "" }, block: { true: "" } },
  defaultVariants: { size: "sm" },
});
const Danger = styled(Button)`
  color: red;
`;
const Plain = styled.a`
  color: blue;
`;
const Card = (p: { className?: string; title: string }) => <div className={p.className}>{p.title}</div>;
const StyledCard = styled(Card)`
  padding: 1px;
`;

export const ok = (
  <>
    <Button size="lg" block onClick={() => {}} type="submit">
      x
    </Button>
    <Danger size="sm" disabled>
      y
    </Danger>
    <Plain href="/x" style={vars({ c: "red" })}>
      z
    </Plain>
    <StyledCard title="t" />
  </>
);
// @ts-expect-error invalid variant
export const bad1 = <Button size="xl" />;
// @ts-expect-error href is not a button prop
export const bad2 = <Button href="/" />;
// @ts-expect-error title required
export const bad3 = <StyledCard />;
export const asLink = (
  <Button as="a" href="/x" size="lg">
    link
  </Button>
);
// @ts-expect-error button props don't exist on "a" with invalid attr
export const bad4 = <Button as="a" type={123} />;
import { Flex } from "../src/index.js";
export const f1 = (
  <Flex direction="column" alignItems="center" grid fullWidth gap={8} onClick={() => {}}>
    a
  </Flex>
);
export const f2 = (
  <Flex as="a" href="/x" $direction="row">
    b
  </Flex>
);
// @ts-expect-error invalid direction
export const f3 = <Flex direction="sideways" />;
