var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/index', (req,res)=>{
  res.render('index')
})

app.post("/formValues", (request,response) => {
  response.locals.name=request.body.fullname
  response.locals.age =request.body.age
  response.locals.codeExp = request.body.codeExp
  response.render("formdata")
})

app.get('/form2',(req,res)=> {
  res.render('form2')
})

app.post('/form2data', (request,response) => {
  const pfpurl = request.body.pfpurl
  const fwebsite = request.body.fwebsite
  response.locals.username =request.body.username
  response.locals.fnumber =request.body.fnumber
  response.locals.abtu =request.body.abtu
  response.render('form2View')
})

app.get('/form3',(req,res)=> {
  res.render('form3')
})

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
