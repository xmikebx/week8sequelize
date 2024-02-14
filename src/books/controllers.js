const sequelize = require("../db/connection");
const Book = require("./model");
const Genre = require("../genres/model");

////// ADD BOOK /////

const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      GenreId: req.body.GenreId,
    });
    res.status(201).json({ message: `${book.title} was added`, book: book });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

///// GET ALL BOOKS /////

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ include: Genre });
    console.log("Route: ", req.path);
    res.send({ message: "all the books", books: books });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// GET A BOOK /////

const getABook = async (req, res) => {
  try {
    const books = await Book.findOne({
      where: { title: req.body.title },
      rejectOnEmpty: true,
    });

    console.log("Route: ", req.path);
    res.send({ message: "the book", books: books });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// GET BOOK BY AUTHOR /////

///// UPDATE A BOOKS AUTHOR BY TITLE /////

const updateBook = async (req, res) => {
  try {
    const update = await Book.update(
      { author: req.body.author },
      { where: { title: req.body.title } }
    );
    console.log("book updated:", update);
    res.send({ message: "book updated", update: update });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// DELETE A BOOK BY TITLE /////

const deleteBook = async (req, res) => {
  try {
    const bookToDestroy = await Book.destroy({
      where: {
        title: req.body.title,
      },
    });

    console.log("book deleted:", bookToDestroy);
    res.send({ message: "book deleted", bookToDestroy: bookToDestroy });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// DELETE ALL BOOKS //////

const deleteAllBooks = async (req, res) => {
  try {
    const destroyAllBooks = await sequelize.destroyAll({
      where: {},
    });

    console.log("all books deleted:", destroyAllBooks);
    res.send({
      message: "all books deleted",
      destroyAllBooks: destroyAllBooks,
    });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  updateBook: updateBook,
  deleteBook: deleteBook,
  getABook: getABook,
  deleteAllBooks: deleteAllBooks,
};
