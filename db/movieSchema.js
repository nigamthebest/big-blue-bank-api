var schema = new Schema({
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
