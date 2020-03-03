const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 3000;

app.listen(PORT, console.log(`Express server listening on port ${PORT}...`));