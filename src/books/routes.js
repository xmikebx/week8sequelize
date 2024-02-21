const { Router } = require("express");
const bookRouter = Router();

const { addBook, getAllBooks, getABookByTitle } = require("./controllers");
const { updateBook } = require("./controllers");
const { deleteBook, deleteAllBooks } = require("./controllers");

bookRouter.post("/books/addBook", addBook);

bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.get("/books/getABookByTitle/:title", getABookByTitle);
bookRouter.put("/books/updateBook/:title", updateBook);
bookRouter.delete("/books/deleteBook", deleteBook);
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks);

// get all books

// update book author

// delete a single book by title

module.exports = bookRouter;
