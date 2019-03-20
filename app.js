require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')
// const cors = require('cors');

const columnRoutes = require('./routes/columns.routes');
const cardsRoutes = require('./routes/cards.routes');
const authRoutes = require('./routes/auth.routes');

require('./configs/db.config');

const cors = require('./configs/cors.config')
const session = require('./configs/session.config');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//lo metemos para que tire pero lo que hace es permitir todos los origenes
// en producción solo permitimos los origenes conocidos
//para que funcione como debe hay que configurarlo
//al haberlo configurado ya no hay que ejecutarlo porque lo ejecutamos en la config y ahroa es una constante
app.use(cors);
// app.use(cors());
// la sesión nunca nunca antes que el cors
app.use(session);
app.use(passport.initialize());
app.use(passport.session())

app.use('/columns', columnRoutes);
app.use('/cards', cardsRoutes);
app.use('/', authRoutes);

app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  console.error(error);

  res.status(error.status || 500);

  const data = {}

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message
    }
    data.errors = error.errors
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }

  data.message = error.message;
  res.json(data);
});

module.exports = app;
