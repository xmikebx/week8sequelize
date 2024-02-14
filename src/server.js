require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Genre = require("./genres/model");

const bookRouter = require("./books/routes");
const genreRouter = require("./genres/routes");

const port = process.env.PORT || 5002;

const app = express();

app.use(express.json());
app.use(bookRouter);
app.use(genreRouter);

const syncTables = async () => {
  Genre.hasOne(Book);
  Book.belongsTo(Genre);

  Genre.sync();
  Book.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
