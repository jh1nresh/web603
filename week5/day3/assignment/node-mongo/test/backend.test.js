const assert = require("node:assert/strict");
const test = require("node:test");
const express = require("express");

const Book = require("../app/models/book.model");
const controller = require("../app/controllers/book.controller");
const registerBookRoutes = require("../app/routes/book.router");
const seedData = require("../../db.json");

test("Book model exposes the required title and author fields", () => {
  assert.equal(Book.schema.path("title").instance, "String");
  assert.equal(Book.schema.path("author").instance, "String");
  assert.equal(Book.schema.path("title").isRequired, true);
  assert.equal(Book.schema.path("author").isRequired, true);
});

test("controller exports all five CRUD handlers", () => {
  assert.equal(typeof controller.createBook, "function");
  assert.equal(typeof controller.getBook, "function");
  assert.equal(typeof controller.books, "function");
  assert.equal(typeof controller.updateBook, "function");
  assert.equal(typeof controller.deleteBook, "function");
});

test("router registers the required API methods and paths", () => {
  const app = express();
  registerBookRoutes(app);

  const routes = app._router.stack
    .filter((layer) => layer.route)
    .map((layer) => {
      const method = Object.keys(layer.route.methods)[0].toUpperCase();
      return `${method} ${layer.route.path}`;
    });

  assert.deepEqual(routes, [
    "POST /api/book",
    "GET /api/book/:id",
    "GET /api/books",
    "PUT /api/book",
    "DELETE /api/book/:id"
  ]);
});

test("db.json contains the four assigned books", () => {
  assert.deepEqual(
    seedData.books.map(({ title, author }) => ({ title, author })),
    [
      { title: "Da Vinci Code", author: "Dan Brown" },
      { title: "Lord of The Rings", author: "J.R.R. Tolkien" },
      { title: "The Alchemist", author: "Paul Coelho" },
      { title: "A Tale of Two Cities", author: "Charles Dickens" }
    ]
  );
});
