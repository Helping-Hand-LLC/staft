const express = require('express');
const mongoose = require('mongoose');
const { port, mongoUri } = require('./config/keys');

const app = express();

// mongodb connection
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.error(err));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.route('/')
  .get((req, res) => res.send('hello world!'));

app.listen(port, () => console.log(`express server listening on port ${port}...`));