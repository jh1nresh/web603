const assert = require("node:assert/strict");
const test = require("node:test");
const express = require("express");

const Inventory = require("../app/models/inventory.model");
const controller = require("../app/controllers/inventory.controller");
const registerInventoryRoutes = require("../app/routes/inventory.router");

test("Inventory model exposes the four required fields", () => {
  assert.equal(Inventory.schema.path("prodname").instance, "String");
  assert.equal(Inventory.schema.path("qty").instance, "Number");
  assert.equal(Inventory.schema.path("price").instance, "Number");
  assert.equal(Inventory.schema.path("status").instance, "String");
});

test("controller exports all five CRUD handlers", () => {
  assert.equal(typeof controller.createInventory, "function");
  assert.equal(typeof controller.getInventory, "function");
  assert.equal(typeof controller.inventories, "function");
  assert.equal(typeof controller.updateInventory, "function");
  assert.equal(typeof controller.deleteInventory, "function");
});

test("router registers the required API methods and paths", () => {
  const app = express();
  registerInventoryRoutes(app);

  const routes = app._router.stack
    .filter((layer) => layer.route)
    .map((layer) => {
      const method = Object.keys(layer.route.methods)[0].toUpperCase();
      return `${method} ${layer.route.path}`;
    });

  assert.deepEqual(routes, [
    "POST /api/inventory",
    "GET /api/inventory/:id",
    "GET /api/inventories",
    "PUT /api/inventory",
    "DELETE /api/inventory/:id"
  ]);
});
