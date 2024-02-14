const { Router } = require("express");
const bookRouter = Router();

const { addBook } = require("./controllers");
const { getAllBooks } = require("./controllers");
const { updateBook } = require("./controllers");
const { deleteBook } = require("./controllers");
const { getABook } = require("./controllers");

bookRouter.post("/books/addBook", addBook);

bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.get("/books/getABook", getABook);
bookRouter.put("/books/updateBook", updateBook);
bookRouter.delete("/books/deleteBook", deleteBook);

// get all books

// update book author

// delete a single book by title

module.exports = bookRouter;
