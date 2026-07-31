const path = require("node:path");

const seedData = require(path.resolve(__dirname, "../../db.json"));
const Book = require("./models/book.model");

async function seedBooks() {
  const bookCount = await Book.countDocuments();

  if (bookCount > 0) {
    return false;
  }

  await Book.insertMany(
    seedData.books.map(({ title, author }) => ({ title, author }))
  );
  return true;
}

module.exports = { seedBooks };
