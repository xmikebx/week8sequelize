const sequelize = require("../db/connection");
const Author = require("./model");
const Book = require("../books/model");
const Genre = require("../genres/model");

////// ADD AUTHOR /////

const addAuthor = async (req, res) => {
  try {
    const author = await Author.create({
      authorname: req.body.authorname,
    });
    res
      .status(201)
      .json({ message: `${author.authorname} was added`, author: author });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

///// GET ALL BOOKS BY AUTHOR /////

const getAllBooksByAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { id: req.body.AuthorId },
    });

    // console.log("Route: ", req.path, author, author.authorname, author.id);

    const booksByAuthor = await Book.findAll({
      where: {
        AuthorId: author.id,
      },
      include: { all: true },
    });

    res.send({
      ///// works but i'm still struggling with getting details in here
      ///// (e.g author.authorname above = "helen")
      message: `books by author:`,
      booksByAuthor: booksByAuthor,
    });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

///// GET All AUTHORS /////

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    console.log("Route: ", req.path);
    res.send({ message: `all authors:`, authors: authors });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

module.exports = {
  addAuthor: addAuthor,
  getAllBooksByAuthor: getAllBooksByAuthor,
  getAllAuthors: getAllAuthors,
};
