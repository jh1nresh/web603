import assert from "node:assert/strict";
import test from "node:test";

import { getMissingNo } from "./01-missing-element/script.js";
import { get2Smallest } from "./02-two-smallest/script.js";
import { getFirstRepeating } from "./03-first-repeating/script.js";

test("finds the missing number", () => {
  assert.equal(getMissingNo([1, 2, 3, 5]), 4);
});

test("finds the smallest and second smallest numbers", () => {
  assert.deepEqual(get2Smallest([12, 13, 1, 10, 34, 1]), {
    first: 1,
    second: 10,
  });
});

test("finds the first repeating element", () => {
  assert.equal(getFirstRepeating([10, 5, 3, 4, 3, 5, 6]), 5);
});
