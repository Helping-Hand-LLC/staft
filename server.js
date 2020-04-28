const express = require('express');
const passport = require('passport');
const connectdb = require('./config/db');
const { port } = require('./config/keys');

const app = express();

// mongodb connection
connectdb();

// passport config
require('./config/passport');

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize passport
app.use(passport.initialize());

// routes
app.use('/auth', require('./routes/auth'));
app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  require('./routes/user')
);
app.use('/organization', require('./routes/organization'));

app.listen(port, () =>
  console.log(`express server listening on port ${port}...`)
);
