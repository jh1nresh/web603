import test from "node:test";
import assert from "node:assert/strict";
import {
  cartQuantity,
  cartTotal,
  factorial,
  kelvinToFahrenheit,
  quickSort,
  sortProducts,
  sortTodos,
  weekFromHash,
} from "../src/lib.js";

test("sortTodos supports ascending and descending text order", () => {
  const todos = [{ text: "Walk" }, { text: "Breakfast" }, { text: "Shower" }];
  assert.deepEqual(
    sortTodos(todos, "asc").map((todo) => todo.text),
    ["Breakfast", "Shower", "Walk"],
  );
  assert.deepEqual(
    sortTodos(todos, "desc").map((todo) => todo.text),
    ["Walk", "Shower", "Breakfast"],
  );
});

test("quicksort preserves duplicates and sorts numbers", () => {
  assert.deepEqual(quickSort([43, 59, 29, 18, 29]), [18, 29, 29, 43, 59]);
});

test("factorial validates input and calculates recursively", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(10), 3628800);
  assert.throws(() => factorial(-1), TypeError);
});

test("product sort implements normal, lowest, and highest switch branches", () => {
  const products = [
    { id: 2, price: 30 },
    { id: 1, price: 10 },
    { id: 3, price: 20 },
  ];
  assert.deepEqual(sortProducts(products, "normal").map((item) => item.id), [1, 2, 3]);
  assert.deepEqual(sortProducts(products, "lowest").map((item) => item.price), [10, 20, 30]);
  assert.deepEqual(sortProducts(products, "highest").map((item) => item.price), [30, 20, 10]);
});

test("cart helpers calculate quantity and price", () => {
  const products = [
    { id: 1, price: 10 },
    { id: 2, price: 12.5 },
  ];
  const quantities = { 1: 2, 2: 1 };
  assert.equal(cartQuantity(quantities), 3);
  assert.equal(cartTotal(products, quantities), 32.5);
});

test("Kelvin converts to rounded Fahrenheit", () => {
  assert.equal(kelvinToFahrenheit(273.15), 32);
});

test("week routing preserves assignment anchors and harmless hashes", () => {
  assert.equal(weekFromHash("#week-4"), 4);
  assert.equal(weekFromHash("#w4d2-exercise"), 4);
  assert.equal(weekFromHash("#w3d3-assignment"), 3);
  assert.equal(weekFromHash("#top", 4), 4);
});
