var createError = require('http-errors');
var paginate = require('express-paginate');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use(paginate.middleware(10, 50));

app.all(function(req, res, next) {
  // set default or minimum is 10 (as it was prior to v0.2.0)
  if (req.query.limit <= 5) req.query.limit = 5;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('notfound')
});


module.exports = app;
