// const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const { port, mongoUri, sessionSecret } = require('./config/keys');

// const app = express();

// // passport config
// require('./config/passport')(passport);

// // mongodb connection
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.error(err));

// // ejs
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// // static files
// app.use(express.static(__dirname + '/public'));

// // body parser
// app.use(express.urlencoded({ extended: false }));

// // express session
// app.use(session({
//     secret: sessionSecret,
//     resave: true,
//     saveUninitialized: true
// }));

// // initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // connect flash
// app.use(flash());

// // global variables
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

// // routes
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// const PORT = port || 3000;

// app.listen(PORT, console.log(`Express server listening on port ${PORT}...`));