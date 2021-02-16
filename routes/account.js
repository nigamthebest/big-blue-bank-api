var express = require("express");
var router = express.Router();
const contextService = require('request-context');
var authorizationHandler = require('../handlers/authrizationHandler');
const { v4: uuidv4 } = require('uuid');
const NodeCache = require("node-cache");
const accountStore = new NodeCache({ stdTTL: 3000, checkperiod: 800 });
const transactionStore = new NodeCache({ stdTTL: 3000, checkperiod: 800 });

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Retrieve a list of accounts for the authenticated user.
 *     description: Retrieve a list of accounts from the DB based on the user info in the access token.
 *     responses:
 *       200:
 *         description: A list of accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique id of the account.
 *                         example: acb11393-feb3-406e-8cae-cc7a45005f1f
 *                       userId:
 *                         type: string
 *                         description: The id of the account owber.
 *                         example: ebc2229a-c609-4249-ac79-bffaf24305a1
 *                       accountType:
 *                         type: string
 *                         description: Type of the account Saving or current.
 *                         example: Saving
 *                       balance:
 *                         type: float
 *                         description: balance in the account.
 *                         example: 100.00
 *                       country:
 *                         type: string
 *                         description: Country code.
 *                         example: US
 */
router.get("/", authorizationHandler.checkToken, async (req, res) => {
  const userId = contextService.get('request:decodedToken.user.id');
  const accountExitForUser = accountStore.has(userId);
  let accountList = [];
  if (accountExitForUser) {
    accountStore.get(userId).forEach(element => {
      accountList.push(accountStore.get(element));
    });
  }
  let response = { "accountList": accountList }
  res.status(200).json(response);
});
router.get("/:id", authorizationHandler.checkToken, async (req, res) => {
  const userId = contextService.get('request:decodedToken.user.id');
  const hasUser = accountStore.has(userId);
  const hasAccount = hasUser ? accountStore.get(userId).includes(req.params.id) : false

  if (hasAccount) {
    res.status(200).json(accountStore.get(req.params.id));
  }
  else {
    res.status(404).json({ "error": "Account Not found" });
  }
});

router.delete("/:id", authorizationHandler.checkToken, async (req, res) => {
  const userId = contextService.get('request:decodedToken.user.id');
  const hasUser = accountStore.has(userId);
  const accountIdList = accountStore.get(userId);
  const accountId = req.params.id;
  const hasAccount = hasUser ? accountIdList.includes(accountId) : false
  if (hasAccount) {
    let accountIdIndex = accountIdList.indexOf(accountId);
    accountIdList.splice(accountIdIndex, 1);
    accountStore.set(userId, accountIdList)
    accountStore.del(req.params.id)
  }
  res.status(200).json({ "message": "Account is Deleted" });
});

router.post("/", authorizationHandler.checkToken, (req, res) => {
  let accountId = uuidv4();
  let userId = contextService.get('request:decodedToken.user.id');
  let accountListExist = accountStore.has(userId);

  const createdAccount = {
    id: accountId,
    userId: userId,
    accountType: req.body.accountType,
    balance: req.body.balance,
    currency: req.body.currency,
    country: req.body.country,
    kycStatus: req.body.kycStatus,
  };
  accountStore.set(accountId, createdAccount)

  if (accountListExist) {
    let existingAccountList = accountStore.get(userId)
    existingAccountList.push(accountId)
    accountStore.set(userId, existingAccountList)
  } else {
    let newAccountList = [];
    newAccountList.push(accountId)
    accountStore.set(userId, newAccountList)
  }
  res.status(201).json(createdAccount);
});

router.post("/transactions/:accountId", authorizationHandler.checkToken, (req, res) => {
  let accountId = req.params.accountId;
  let transactionId = uuidv4();
  let userId = contextService.get('request:decodedToken.user.id');
  let transactionListExist = transactionStore.has(accountId);

  const createdTransaction = {
    id: transactionId,
    accountId: accountId,
    transactionType: req.body.transactionType,
    amount: req.body.amount,
    currency: req.body.currency,
    date: req.body.date,
  };
  transactionStore.set(transactionId, createdTransaction)

  if (transactionListExist) {
    let existingTransactionList = transactionStore.get(accountId)
    existingTransactionList.push(transactionId)
    transactionStore.set(accountId, existingTransactionList)
  } else {
    let newTransactionList = [];
    newTransactionList.push(transactionId)
    accountStore.set(accountId, newTransactionList)
  }
  res.status(201).json(createdTransaction);
});

router.get("/transactions/:accountId", authorizationHandler.checkToken, async (req, res) => {
  const userId = contextService.get('request:decodedToken.user.id');
  const accountId = req.params.accountId;
  const transactionExitForUser = transactionStore.has(accountId);
  let transactionList = [];
  if (transactionExitForUser) {
    transactionStore.get(accountId).forEach(element => {
      transactionList.push(transactionStore.get(element));
    });
  }
  let response = { "transactionList": transactionList }
  res.status(200).json(response);
});

module.exports = router;


