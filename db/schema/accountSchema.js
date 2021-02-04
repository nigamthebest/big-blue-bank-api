var mongoose = require('mongoose');
// Define schema
var schema = mongoose.Schema({
  id:{ type: String, index: true, unique: true, required: true },
  userId:{ type: String, index: true, required: true },
  accountType: String,
  balance: Number,
  currency: String,
  country: String,
  kycStatus: Boolean
});
schema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
  }
});
module.exports = mongoose.model("Account", schema);