import { test } from "node:test";
import assert from "node:assert/strict";
import { fallbackAlreadyShown, shouldCloseCvMenu, galleryStep } from "../../src/lib/ui.ts";

const anim = (animationName: string, playState: string, currentTime: number | null) => ({
  animationName,
  playState,
  currentTime,
});

test("fallbackAlreadyShown: no animations", () => {
  assert.equal(fallbackAlreadyShown([]), false);
});
test("fallbackAlreadyShown: other animation finished", () => {
  assert.equal(fallbackAlreadyShown([anim("other", "finished", 5000)]), false);
});
test("fallbackAlreadyShown: fallback finished", () => {
  assert.equal(fallbackAlreadyShown([anim("reveal-fallback", "finished", 2400)]), true);
});
test("fallbackAlreadyShown: fallback running past its delay", () => {
  assert.equal(fallbackAlreadyShown([anim("reveal-fallback", "running", 2100)]), true);
});
test("fallbackAlreadyShown: fallback still in its delay", () => {
  assert.equal(fallbackAlreadyShown([anim("reveal-fallback", "running", 500)]), false);
});
test("fallbackAlreadyShown: fallback running with null time", () => {
  assert.equal(fallbackAlreadyShown([anim("reveal-fallback", "running", null)]), false);
});

test("shouldCloseCvMenu: focus stays inside", () => {
  assert.equal(shouldCloseCvMenu(true, false), false);
});
test("shouldCloseCvMenu: tab out with pointer over the menu", () => {
  assert.equal(shouldCloseCvMenu(false, true), true);
});
test("shouldCloseCvMenu: Safari click (null target) under pointer", () => {
  assert.equal(shouldCloseCvMenu(null, true), false);
});
test("shouldCloseCvMenu: focus lost to nowhere, pointer away", () => {
  assert.equal(shouldCloseCvMenu(null, false), true);
});

test("galleryStep: forward", () => assert.equal(galleryStep(0, 1, 3), 1));
test("galleryStep: wraps forward", () => assert.equal(galleryStep(2, 1, 3), 0));
test("galleryStep: wraps backward", () => assert.equal(galleryStep(0, -1, 3), 2));
test("galleryStep: single image stays", () => assert.equal(galleryStep(0, 1, 1), 0));
test("galleryStep: empty gallery", () => assert.equal(galleryStep(0, -1, 0), 0));
