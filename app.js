const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// db config
const db = require('./config/keys').mongoUri;

// mongodb connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 3000;

app.listen(PORT, console.log(`Express server listening on port ${PORT}...`));