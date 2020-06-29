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
  if(movies)
    res.send(movies);
  else
    res.send(404,"Movie Not found")
});

router.delete("/:title", async (req, res) => {
  const movies = await Movie.findOneAndRemove({ title: req.params.title }, (err) => {
    if (err) {
      return res.send("error", err);
    }
    return res.send(200, "Movie has been deleted.");
  }).catch(function (error) {
    console.log("Error Deleting Movie: ");
    console.log(error);
      return res.status(400).statusMessage(error.message).send();
    });
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
