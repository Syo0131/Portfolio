import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveLang, withLangParam } from "../../src/i18n/lang.ts";

test("resolveLang: URL param wins over stored", () => {
  assert.equal(resolveLang("?lang=en", "es"), "en");
});
test("resolveLang: stored when no param", () => {
  assert.equal(resolveLang("", "en"), "en");
});
test("resolveLang: invalid param falls back to es", () => {
  assert.equal(resolveLang("?lang=fr", null), "es");
});
test("resolveLang: invalid stored falls back to es", () => {
  assert.equal(resolveLang("", "xx"), "es");
});
test("withLangParam: replaces existing lang", () => {
  assert.equal(withLangParam("https://daybeldiaz.dev/?lang=en", "es"), "https://daybeldiaz.dev/?lang=es");
});
test("withLangParam: keeps other params and hash", () => {
  assert.equal(
    withLangParam("https://daybeldiaz.dev/proyectos?utm_source=x&lang=en#proyectos", "es"),
    "https://daybeldiaz.dev/proyectos?utm_source=x&lang=es#proyectos",
  );
});
test("withLangParam: null when URL has no lang param", () => {
  assert.equal(withLangParam("https://daybeldiaz.dev/#proyectos", "en"), null);
});

test("withLangParam: keeps other params' encoding untouched", () => {
  assert.equal(withLangParam("https://x.dev/?q=a%20b&lang=en", "es"), "https://x.dev/?q=a%20b&lang=es");
});
test("withLangParam: keeps valueless params", () => {
  assert.equal(withLangParam("https://x.dev/?ref&lang=en#p", "es"), "https://x.dev/?ref&lang=es#p");
});
