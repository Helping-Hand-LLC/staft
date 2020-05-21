const express = require('express');
// const passport = require('passport');
// const connectdb = require('./config/db');
const app = express();

// mongodb connection
// connectdb();

// passport config
// require('./middleware/passport');

// body parser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// initialize passport
// app.use(passport.initialize());

// FIXME: test route
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// routes
// app.use('/auth', require('./routes/auth'));
// app.use(
//   '/user',
//   passport.authenticate('jwt', { session: false }),
//   require('./routes/user')
// );
// app.use('/organizations', require('./routes/organizations/organization'));

module.exports = app;
