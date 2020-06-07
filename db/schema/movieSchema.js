var mongoose = require('mongoose');
// Define schema
var schema =  mongoose.Schema({
  genres: [String],
  original_language: String,
  original_title: String,
  overview: String,
  release_date: Date,
  runtime: { type: Number, min: 1, max: 200, required: true },
  spoken_languages: [String],
  tagline: String,
  title: String,
});
module.exports = mongoose.model("Movie", schema);