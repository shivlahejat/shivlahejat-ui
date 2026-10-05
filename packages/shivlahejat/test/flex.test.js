import { test } from "node:test";
import assert from "node:assert/strict";
import * as React from "react";
import { renderToString } from "react-dom/server";
import styled, { Flex, createTheme } from "../dist/index.js";

const h = React.createElement;
const page = (...c) => renderToString(h("html", null, h("head"), h("body", null, ...c)));

test("same props as the styled-components Flex, nothing leaks to the DOM", () => {
  const html = page(
    h(
      Flex,
      {
        direction: "column",
        alignItems: "center",
        justifyContent: "space-between",
        wrap: "wrap",
        fullWidth: true,
        disabled: true,
      },
      "x"
    )
  );
  const div = html.match(/<div[^>]*>/)[0];
  assert.match(div, /--sl-fd:column/);
  assert.match(div, /--sl-ai:center/);
  assert.match(div, /--sl-jc:space-between/);
  assert.match(div, /--sl-fw:wrap/);
  assert.match(div, /-fullWidth-true/);
  assert.doesNotMatch(div, / (direction|alignitems|justifycontent|wrap|fullwidth|disabled|grid)=/i);
});

test("$ props work and win over plain props", () => {
  const div = page(h(Flex, { $direction: "column", direction: "row", $grid: true })).match(/<div[^>]*>/)[0];
  assert.match(div, /--sl-fd:column/);
  assert.match(div, /-grid-true/);
  assert.doesNotMatch(div, /\$/);
});

test("defaults are set on every Flex so nesting never inherits", () => {
  const html = page(h(Flex, { direction: "column" }, h(Flex, null, "inner")));
  const divs = html.match(/<div[^>]*>/g);
  assert.match(divs[1], /--sl-fd:row/);
  assert.match(divs[1], /--sl-ai:flex-start/);
});

test("grid uses theme general.gridGap, or the gridGap prop", () => {
  const theme = createTheme({ general: { gridGap: "15px" } });
  const html = page(h(theme.Styles), h(Flex, { grid: true }), h(Flex, { grid: true, gridGap: 8 }));
  assert.match(html, /--general-gridGap:15px/);
  assert.match(html, /--sl-grid-gap:var\(--general-gridGap, 0px\)/);
  assert.match(html, /--sl-grid-gap:8px/);
  assert.match(html, />div\{flex-grow:0;flex-shrink:0\}|> div\{flex-grow:0;flex-shrink:0\}/);
});

test("as, className, style and gap are merged", () => {
  const div = page(h(Flex, { as: "ul", className: "list", style: { color: "red" }, gap: 12 })).match(
    /<ul[^>]*>/
  )[0];
  assert.match(div, /class="sl-[^"]* list"/);
  assert.match(div, /color:red/);
  assert.match(div, /--sl-gap:12px/);
});

test("can be extended with styled(Flex)", () => {
  const Toolbar = styled(Flex)`
    padding: 8px;
  `;
  const div = page(h(Toolbar, { alignItems: "center" })).match(/<div[^>]*>/)[0];
  assert.match(div, /--sl-ai:center/);
});

test("transient $ props are stripped on every styled component", () => {
  const Box = styled.div`
    color: red;
  `;
  assert.doesNotMatch(page(h(Box, { $active: true })), /active/);
});
