var express = require("express");
var router = express.Router();
var accountSchema = require("../db/schema/accountSchema");
const contextService = require('request-context');
var bodyParser = require("body-parser");
var authorizationHandler = require('../handlers/authrizationHandler');
var app = express();
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get("/", authorizationHandler.checkToken, async (req, res) => {
  const accountList = await accountSchema.find({ userId: contextService.get('request:decodedToken.user.id') });
  let response = { "accountList": accountList }
  res.send(response);
});
router.get("/:id", async (req, res) => {
  const accountList = await accountSchema.findOne({ title: req.params.id });

  if (accountList) {
    res.send(accountList);
  }
  else
    res.send(404, "Account Not found")
});

router.delete("/:id", authorizationHandler.checkToken, async (req, res) => {
  const accountList = await accountSchema.findOneAndRemove({ title: req.params.id }, (err) => {
    if (err) {
      return res.send("error", err);
    }
    return res.send(200, "Account has been deleted.");
  }).catch(function (error) {
    console.log("Error Deleting Account: ");
    console.log(error);
    return res.status(400).statusMessage(error.message).send();
  });
});

router.post("/", authorizationHandler.checkToken, async (req, res) => {
  const createdAccount = new accountSchema({
    id: uuidv4(),
    userId: contextService.get('request:decodedToken.user.id'),
    accountType: req.body.accountType,
    balance: req.body.balance,
    currency: req.body.currency,
    country: req.body.country,
    kycStatus: req.body.kyc_status,
  });
  await createdAccount.save();
  res.send(createdAccount);
});

module.exports = router;


