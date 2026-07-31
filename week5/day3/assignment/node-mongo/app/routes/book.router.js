const books = require("../controllers/book.controller");

module.exports = function registerBookRoutes(app) {
  app.post("/api/book", books.createBook);
  app.get("/api/book/:id", books.getBook);
  app.get("/api/books", books.books);
  app.put("/api/book", books.updateBook);
  app.delete("/api/book/:id", books.deleteBook);
};
