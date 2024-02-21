const sequelize = require("../db/connection");
const Book = require("./model");
const Genre = require("../genres/model");
const Author = require("../authors/model");

////// ADD BOOK /////

const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      AuthorId: req.body.AuthorId,
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
    const books = await Book.findAll({ include: { all: true } });
    console.log("Route: ", req.path);
    res.send({ message: "all the books", books: books });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// GET A BOOK BY TITLE /////

const getABookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { title: req.params.title },
      rejectOnEmpty: true,
      include: { all: true },
    });

    console.log("Route: ", req.path);
    res.send({ book: book });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// UPDATE A BOOKS DETAILS BY LOCATING WITH TITLE /////

const updateBook = async (req, res) => {
  try {
    ///// book to update located by title parameter /////
    const bookToUpdate = await Book.findOne({
      where: { title: req.params.title },
    });
    ///// create an object containing the body key/value pairs /////
    const updatedBookDetails = {
      title: req.body.title,
      AuthorId: req.body.AuthorId,
      GenreId: req.body.GenreId,
    };
    // console.log(updatedBookDetails);

    ///// update the book with those details /////
    bookToUpdate.update(updatedBookDetails);

    res.send({ message: "book updated", bookToUpdate });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }

  // console.log(getTitle);
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
    ///// deletes all books but not the authors & genres, they could be included in this
    const destroyAllBooks = await Book.destroy({
      truncate: true,
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
  getABookByTitle: getABookByTitle,
  deleteAllBooks: deleteAllBooks,
};
