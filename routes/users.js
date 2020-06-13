var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../db/schema/userSchema");
var bodyParser = require("body-parser");
var app = express();
const jwt = require("jsonwebtoken");
var BCRYPT_SALT_ROUNDS = 12;
app.use(bodyParser.json());

router.post("/register", async (req, res) => {
  var password = req.body.password;
  bcrypt
    .hash(password, BCRYPT_SALT_ROUNDS)
    .then(function (hashedPassword) {
      const createdUser = new User({
        email_address: req.body.email_address,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      return createdUser.save();
    })
    .then(function () {
      res.send("Registration Success");
    })
    .catch(function (error) {
      console.log("Error saving user: ");
      console.log(error);
      next();
    });
});


app.post('/login', async (req, res) => { 
  var username = req.body.username;
  var password = req.body.password;

  usersDB.getUserByUsername(username)
    .then(function(user) {
        return bcrypt.compare(password, user.password);
    })
    .then(function(samePassword) {
        if(!samePassword) {
            res.status(403).send();
        }
        res.send();
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
});

module.exports = router;
