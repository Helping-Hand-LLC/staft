const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { port, mongoUri } = require('./config/keys');

const app = express();

// mongodb connection
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.error(err));

// passport config
require('./config/passport');

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize passport
app.use(passport.initialize());

// routes
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/user', passport.authenticate('jwt', { session: false }), require('./routes/user'));

app.listen(port, () => console.log(`express server listening on port ${port}...`));