const { Router } = require("express");
const authorRouter = Router();

const {
  addAuthor,
  getAllBooksByAuthor,
  getAllAuthors,
} = require("./controllers");

authorRouter.post("/authors/addAuthor", addAuthor);
authorRouter.get("/authors/getAllBooksByAuthor", getAllBooksByAuthor);
authorRouter.get("/authors/getAllAuthors", getAllAuthors);

module.exports = authorRouter;
