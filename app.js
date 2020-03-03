const express = require('express');

const app = express();

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 3000;

app.listen(PORT, console.log(`Express server listening on port ${PORT}...`));