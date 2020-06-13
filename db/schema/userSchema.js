var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Define schema
var userSchema =  mongoose.Schema({
  email_address: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);