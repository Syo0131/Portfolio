import { test } from "node:test";
import assert from "node:assert/strict";
import { splitProjects, orderProjects, MAX_FEATURED, MAX_CARDS } from "../../src/lib/projectLayout.ts";

const make = (n: number, featured: number) =>
  Array.from({ length: n }, (_, i) => ({ id: `p${i}`, featured: i < featured }));
const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

test("constants", () => {
  assert.equal(MAX_FEATURED, 3);
  assert.equal(MAX_CARDS, 6);
});

test("5 items, 3 featured -> 3 rows, 2 cards, no view-all", () => {
  const r = splitProjects(make(5, 3));
  assert.deepEqual(ids(r.featured), ["p0", "p1", "p2"]);
  assert.deepEqual(ids(r.cards), ["p3", "p4"]);
  assert.equal(r.showViewAll, false);
});

test("5 featured -> only first 3 featured, extras drop to cards in order", () => {
  const r = splitProjects(make(5, 5));
  assert.deepEqual(ids(r.featured), ["p0", "p1", "p2"]);
  assert.deepEqual(ids(r.cards), ["p3", "p4"]);
  assert.equal(r.showViewAll, false);
});

test("0 featured, 6 items -> 6 cards, no view-all", () => {
  const r = splitProjects(make(6, 0));
  assert.equal(r.featured.length, 0);
  assert.equal(r.cards.length, 6);
  assert.equal(r.showViewAll, false);
});

test("3 featured + 7 others -> 5 cards and view-all", () => {
  const r = splitProjects(make(10, 3));
  assert.deepEqual(ids(r.cards), ["p3", "p4", "p5", "p6", "p7"]);
  assert.equal(r.showViewAll, true);
});

test("empty list", () => {
  assert.deepEqual(splitProjects([]), { featured: [], cards: [], showViewAll: false });
});

test("orderProjects: all featured keeps array order", () => {
  assert.deepEqual(ids(orderProjects(make(5, 5))), ["p0", "p1", "p2", "p3", "p4"]);
});

test("orderProjects: capped featured first, extra featured stays in the rest in array order", () => {
  const flags = [true, false, true, false, true, true];
  const items = flags.map((featured, i) => ({ id: `p${i}`, featured }));
  assert.deepEqual(ids(orderProjects(items)), ["p0", "p2", "p4", "p1", "p3", "p5"]);
});
