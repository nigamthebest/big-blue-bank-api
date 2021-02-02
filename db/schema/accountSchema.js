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
module.exports = mongoose.model("Account", schema);