var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
const contextService = require('request-context');

var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var swaggerRouter = require('./routes/swaggerDoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
//const swaggerDocument = require('./swagger.json');


//Set up default mongoose connection
var mongoDB = "mongodb://mongo:27017/bank-schema";
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(contextService.middleware('request'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/account',  accountRouter);
app.use('/user', usersRouter);

const swaggerDocument = require('./swagger.json');
app.use(
  "/api-docs",
  swaggerUi.serve,
  
  swaggerUi.setup(swaggerDocument, { explorer: true })
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
