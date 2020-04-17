const express = require('express');

const app = express();

app.route('/')
  .get((req, res) => res.send('hello world!'));

app.listen(5000, () => console.log('express server listening on port 5000...'));