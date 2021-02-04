var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Define schema
var userSchema = mongoose.Schema({
  id: { type: String, index: true, unique: true, required: true },
  email_address: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String }
});
userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
  }
});
module.exports = mongoose.model("User", userSchema);