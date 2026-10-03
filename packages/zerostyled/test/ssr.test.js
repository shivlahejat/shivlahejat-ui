import { test } from "node:test";
import assert from "node:assert/strict";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { styled, css, createTheme, globalStyle, vars } from "../dist/index.js";

const h = React.createElement;
const page = (...children) => renderToString(h("html", null, h("head", null), h("body", null, ...children)));

test("hoists styles into <head> and dedupes", () => {
  const Button = styled.button`
    padding: 8px;
    &:hover {
      opacity: 0.8;
    }
  `;
  const html = page(h(Button, null, "a"), h(Button, null, "b"), h(Button, null, "c"));
  const head = html.split("<body>")[0];
  assert.equal((html.match(/<style/g) || []).length, 1, "one style tag for 3 buttons");
  assert.match(head, /<style[^>]*data-precedence="zs"/);
  assert.match(head, /padding:8px;&:hover\{opacity:0\.8\}/);
  assert.equal((html.match(/<button class="zs-/g) || []).length, 3);
});

test("variants: classes applied, props not leaked to DOM, defaults work", () => {
  const Btn = styled.button({
    base: css`
      border: 0;
    `,
    variants: {
      size: { sm: "padding: 4px;", lg: "padding: 16px;" },
      block: { true: "width: 100%;" },
    },
    defaultVariants: { size: "sm" },
  });
  const html = page(h(Btn, { size: "lg", block: true }, "x"), h(Btn, null, "y"));
  assert.match(html, /-size-lg/);
  assert.match(html, /-block-true/);
  assert.match(html, /-size-sm/); // default for second button
  assert.doesNotMatch(html, /size="lg"/);
  assert.doesNotMatch(html, / block=/);
});

test("extension layers get higher specificity", () => {
  const Base = styled.button`
    color: red;
  `;
  const Danger = styled(Base)`
    color: white;
  `;
  const html = page(h(Danger, null, "x"));
  const [baseCls] = html.match(/\.zs-[a-z0-9]+\{color:red\}/)[0].match(/zs-[a-z0-9]+/);
  assert.match(html, /(\.zs-[a-z0-9]+){3}\{color:white\}/);
  assert.match(html, new RegExp(`class="${baseCls} zs-`));
});

test("as prop, className merge, styled components as selectors", () => {
  const Icon = styled.span`
    width: 16px;
  `;
  const Link = styled.a`
    color: blue;
    &:hover ${Icon} {
      transform: translateX(2px);
    }
  `;
  const html = page(h(Link, { as: "button", className: "mine" }, h(Icon)));
  assert.match(html, /<button class="zs-[a-z0-9]+ mine"/);
  assert.match(html, /&:hover \.zs-[a-z0-9]+\{transform/);
});

test("wraps custom components that accept className", () => {
  const Card = ({ className, children }) => h("section", { className }, children);
  const Styled = styled(Card)`
    border: 1px solid;
  `;
  assert.match(page(h(Styled, null, "hi")), /<section class="zs-/);
});

test("function interpolation throws a helpful error", () => {
  assert.throws(
    () => styled.div`
      color: ${(p) => p.color};
    `,
    /CSS variable/
  );
});

test("theme, global styles and vars helper", () => {
  const theme = createTheme({ color: { primary: "#4f46e5" }, radius: "8px" });
  assert.equal(theme.color.primary, "var(--color-primary)");
  const Global = globalStyle`body { margin: 0 }`;
  const html = page(h(theme.Styles), h(Global));
  assert.match(html, /:root\{--color-primary:#4f46e5;--radius:8px\}/);
  assert.match(html, /data-precedence="zs-global"/);
  assert.deepEqual(vars({ bg: "red", size: 2 }), { "--bg": "red", "--size": 2 });
});

test("class names are deterministic", () => {
  const A = styled.div`
    color: red;
  `;
  const B = styled.div`
    color: red;
  `;
  assert.equal(String(A), String(B));
});

test("keyframes are hoisted to the top level of the stylesheet", async () => {
  const { keyframes } = await import("../dist/index.js");
  const fade = keyframes`from { opacity: 0 } to { opacity: 1 }`;
  const Box = styled.div({
    base: `&[data-state="open"] { animation: ${fade} 150ms ease-out; }`,
    variants: {
      slow: {
        true: css`
          animation: ${fade} 1s;
        `,
      },
    },
  });
  const html = page(h(Box, { slow: true }));
  assert.match(html, new RegExp(`@keyframes ${fade.name}\\{from\\{opacity:0\\}to\\{opacity:1\\}\\}\\.zs-`));
  assert.match(html, new RegExp(`animation:${fade.name} 150ms`));
  assert.doesNotMatch(html, /\u0001|\u0002/);
});

test("renders a single element (styles inside) so Slot/asChild can clone it", () => {
  const Button = styled.button`
    color: red;
  `;
  const el = Button({ children: "x" });
  assert.equal(el.type, "button");
  const Input = styled.input`
    color: red;
  `;
  assert.equal(Input({}).type, React.Fragment); // void elements fall back to siblings
  const html = page(h(Input, { placeholder: "a" }));
  assert.match(html.split("<body>")[0], /color:red/);
});
