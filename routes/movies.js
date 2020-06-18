var express = require("express");
var router = express.Router();
var Movie = require("../db/schema/movieSchema");
var bodyParser = require("body-parser");
var app = express();
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());

/* GET users listing. */
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});
router.get("/:title", async (req, res) => {
  const movies = await Movie.findOne({ title: req.params.title });
  res.send(movies);
});

router.post("/", async (req, res) => {
  const createdMovie = new Movie({
    id:uuidv4(),
    title: req.body.title,
    content: req.body.content,
    genres: req.body.genres,
    original_language: req.body.original_language,
    original_title: req.body.original_title,
    overview: req.body.overview,
    release_date: req.body.release_date,
    runtime: req.body.runtime,
    spoken_languages: req.body.spoken_languages,
    tagline: req.body.tagline,
    title: req.body.title,
  });
  await createdMovie.save();
  res.send(createdMovie);
});

module.exports = router;
