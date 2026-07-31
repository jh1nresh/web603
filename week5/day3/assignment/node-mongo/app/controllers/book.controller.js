const Book = require("../models/book.model");

function sendDatabaseError(res, message, error) {
  return res.status(500).json({
    message,
    error: error.message
  });
}

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author
    });

    return res.status(201).json(book);
  } catch (error) {
    return sendDatabaseError(res, "Failed to create book", error);
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select("-__v");

    if (!book) {
      return res.status(404).json({
        message: `Book not found with id ${req.params.id}`
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Book not found with id ${req.params.id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error retrieving book with id ${req.params.id}`,
      error
    );
  }
};

exports.books = async (_req, res) => {
  try {
    const books = await Book.find().select("-__v");
    return res.status(200).json(books);
  } catch (error) {
    return sendDatabaseError(res, "Error retrieving books", error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.body._id,
      {
        title: req.body.title,
        author: req.body.author
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-__v");

    if (!book) {
      return res.status(404).json({
        message: `Book not found with id ${req.body._id}`
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Book not found with id ${req.body._id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error updating book with id ${req.body._id}`,
      error
    );
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: `Book not found with id ${req.params.id}`
      });
    }

    return res.status(204).send();
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: `Book not found with id ${req.params.id}`
      });
    }

    return sendDatabaseError(
      res,
      `Error deleting book with id ${req.params.id}`,
      error
    );
  }
};
