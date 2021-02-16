const bodyParser = require("body-parser");

module.exports = () => {
  return [
    (req, res, next) => {
      bodyParser.json()(req, res, (error) => {
        if (error instanceof SyntaxError) {
          res.sendStatus(400);
        } else {
          next();
        }
      });
    },
    bodyParser.urlencoded({ extended: true }),
  ];
};