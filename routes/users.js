var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var User = require("../db/schema/userSchema");
var bodyParser = require("body-parser");
var app = express();
const jwt = require("jsonwebtoken");
const e = require("express");
const { NotExtended } = require("http-errors");
var BCRYPT_SALT_ROUNDS = 12;
const config = require('../config/config.js');
app.use(bodyParser.json());

router.post("/register", async (req, res) => {
  var password = req.body.password;
  bcrypt
    .hash(password, BCRYPT_SALT_ROUNDS)
    .then(function (hashedPassword) {
      const createdUser = new User({
        id: uuidv4(),
        email_address: req.body.email_address,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      return createdUser.save();
    })
    .then(function (user) {
      return res.status(200).json({'access_token': createToken(user) })
      next();
    }).catch(function (error) {
      console.log("Error saving user: ");
      console.log(error);
        return res.status(400).statusMessage(error.message).send();
      });
      next();
  });
function createToken(user) {
  const payload = {
    user: {
      id: user.email_address
    }
  };

  return jwt.sign(
    payload,
    config.secret, {
      expiresIn: '24h' // expires in 24 hours
  });
}


router.post('/login', async (req, res) => {
  var email_address = req.body.email_address;
  var password = req.body.password;
  User.findOne({
    'email_address': email_address
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (user) {
      console.log(user)
      bcrypt.compare(password, user.password).
        then(function (passwordMatch) { 
      console.log(passwordMatch)
      if (!passwordMatch) {
        res.status(403).json({"error":"invalid User id or password"});
      }
          res.status(200).json({'access_token': createToken(user) })
      });        
    }
  });
});

  module.exports = router;
