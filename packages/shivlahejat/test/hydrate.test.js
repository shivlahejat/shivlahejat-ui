import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import * as React from "react";
import { renderToString } from "react-dom/server";

test("hydrates without mismatches and keeps styles in <head>", async () => {
  const { styled, Flex } = await import("../dist/index.js");
  const Button = styled.button({ base: "color: red;", variants: { tone: { a: "color: blue;" } } });
  const Input = styled.input`
    border: 1px solid;
  `;
  const App = () =>
    React.createElement(
      "html",
      null,
      React.createElement("head"),
      React.createElement(
        "body",
        null,
        React.createElement(
          Flex,
          { direction: "column" },
          React.createElement(Button, { tone: "a" }, "Hi"),
          React.createElement(Input, { defaultValue: "x" })
        )
      )
    );

  const html = "<!DOCTYPE html>" + renderToString(React.createElement(App));
  const dom = new JSDOM(html);
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    HTMLElement: dom.window.HTMLElement,
  });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(" "));
  const { hydrateRoot } = await import("react-dom/client");
  await React.act(async () => {
    hydrateRoot(document, React.createElement(App), { onRecoverableError: (e) => errors.push(String(e)) });
  });
  console.error = origError;

  assert.deepEqual(errors, []);
  assert.ok(document.head.querySelectorAll("style[data-precedence]").length >= 1);
  assert.equal(document.body.querySelectorAll("style").length, 0, "no style tags left in body");
  assert.equal(document.querySelector("button").textContent, "Hi");
});
