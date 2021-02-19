var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const jwt = require("jsonwebtoken");
const { NotExtended } = require("http-errors");
var BCRYPT_SALT_ROUNDS = 12;
const config = require('../config/config.js');

// create application/x-www-form-urlencoded parser


const NodeCache = require("node-cache");
const userStore = new NodeCache({ stdTTL: 3000, checkperiod: 800 });

router.post("/register", async (req, res) => {

  var password = req.body.password;
  var email_address = req.body.email_address;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  const userId = uuidv4();
  const createdUser = {
    id: userId,
    email_address: req.body.email_address,
    password: hashedPassword,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  if (userStore.has(email_address)) {
    console.log("Error saving user: ");

    res.status(403).json({ "error": "Email Alredy Exists" });
  } else {
    userStore.set(userId, createdUser);
    userStore.set(email_address, userId);
    res.status(200).json({ 'accessToken': createToken(userId) })
  }

});
function createToken(userId) {
  const payload = {
    user: {
      id: userId
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
  let userExist = userStore.has(email_address)
  if (userExist) {
    let user = userStore.get(userStore.get(email_address))

    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(403).json({ "error": "invalid User id or password" });
    }
    res.status(200).json({ 'accessToken': createToken(user.id) })

  } else
    res.status(403).json({ "error": "invalid User id or password" });
});

module.exports = router;
