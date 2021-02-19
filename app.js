var createError = require('http-errors');
var express = require('express');

var logger = require('morgan');
var bodyParser = require('body-parser')
const contextService = require('request-context');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var app = express();
app.use(logger('dev'));

const expressSwagger = require('express-swagger-generator')(app);
let swaggerGeneratorOptions = {
  swaggerDefinition: {
      info: {
          "title": "Big Blue bank APIs",
          "version": "1.0.0",
          "description":
          "This is a sample CRUD API for Accounts and Users ",
          "license": {
              "name": "MIT",
              "url": "https://spdx.org/licenses/MIT.html"
        },
        contact: {
          name: "bigbluebank.com",
          url: "https://bigbluebank.com",
          email: "info@email.com"
        }
      },
      host: 'localhost:3000',
      basePath: '/v1',
      produces: [
          "application/json",
      ],
      schemes: ['http'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
 
};

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = require('./swagger.json');

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

//const swaggerSpec = swaggerJsdoc(options);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(contextService.middleware('request'));

/*app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);*/
app.use('/account', accountRouter);
app.use('/user', usersRouter);
// health check endpoint
app.get('/', (req, res) => {
  res.send('ok')
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
