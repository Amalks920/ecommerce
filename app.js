var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let hbs=require('express-handlebars');
const mongoose=require('mongoose');
require('dotenv').config();
const fs=require('fs');
//const path=require('path');
const handlebars=require('handlebars');
const db=require('./config/connection');
const session=require('express-session');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')


/*
const headerTemplate= fs.readFile('user-login','utf-8',(err,data)=>{
if(err){
  throw err
}else{
  handlebars.registerPartial('user-login',headerTemplate)
}

})

*/

db.once('open',()=>{
  console.log('db connected successfully')
})


/*defining multer middleware*/



var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials/',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileUpload());
app.use(session({ secret: "Private", resave: true, saveUninitialized: true, cookie: { maxAge: 60000000 } }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/admin', adminRouter);

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


