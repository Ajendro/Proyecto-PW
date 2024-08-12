
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./conexion/mongo');
const cors = require('cors');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRoute = require('./routes/userRoute');
var categoryRoute = require('./routes/categoryRoute');
var productRoute = require('./routes/productRoute');
var reviewRoute = require('./routes/reviewRoute');
var orderDetailRoute = require('./routes/orderDetailRoute');
var orderRoute = require('./routes/orderRoute');
var paymentMethodRoute = require('./routes/paymentMethodRoute');
var shoppingCartRoute = require('./routes/shoppingCartRoute');
var authenticationRoute = require('./routes/authenticationRoute');
var formRoute = require('./routes/formRoute');

var app = express();

app.use(cors());




// view engine setu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', userRoute);
app.use('/apiuser', userRoute);
app.use('/apicategory', categoryRoute);
app.use('/apiproduct', productRoute);
app.use('/apireview', reviewRoute);
app.use('/apiorderDetail', orderDetailRoute);
app.use('/apiorder', orderRoute);
app.use('/apipaymethod', paymentMethodRoute);
app.use('/apishoppingCart', shoppingCartRoute);
app.use('/apiauthentication', authenticationRoute);
app.use('/apiform', formRoute);

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
