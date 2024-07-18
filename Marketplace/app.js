var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRoute = require('./routes/userRoute');
var paymentMethodsRouter = require('./routes/paymentMethods');
var paymentMethodRoute = require('./routes/paymentMethodRoute');
var shoppingCartRouter = require('./routes/shoppingCarts');
var shoppingCartRoute = require('./routes/shoppingCartRoute');
var orderDetailsRouter = require('./routes/orderDetails');
var orderDetailRoute = require('./routes/orderDetailRoute');
var ordersRouter = require('./routes/orders');
var orderRoute = require('./routes/orderRoute');
var db = require('./conexion/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiuser', userRoute);


//paymentMethod
app.use('/paymentMethods', paymentMethodsRouter);
app.use('/apipaymentMethod', paymentMethodRoute);

//shoppingCart
app.use('/shoppingCarts', shoppingCartRouter);
app.use('/apishoppingCart', shoppingCartRoute);

// order Detail
app.use('/orderDetails', orderDetailsRouter);
app.use('/apiorderDetail', orderDetailRoute);

// order
app.use('/orders', ordersRouter);
app.use('/apiorder', orderRoute);

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
