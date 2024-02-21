const sequelize = require("../db/connection");
const Genre = require("./model");
const Author = require("../authors/model");
const Book = require("../books/model");

////// ADD GENRE /////

const addGenre = async (req, res) => {
  try {
    const genre = await Genre.create({
      genrename: req.body.genrename,
    });
    res
      .status(201)
      .json({ message: `${genre.genrename} was added`, genre: genre });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

///// GET ALL GENRES /////

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    console.log("Route: ", req.path);
    res.send({ message: `all genres`, genres: genres });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

module.exports = {
  addGenre: addGenre,
  getAllGenres: getAllGenres,
};
