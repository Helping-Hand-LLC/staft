const mongoose = require('mongoose');
const { mongoUri } = require('../config/keys');

const connectdb = async (req, res, next) => {
  await mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .catch(err => next(err));

  console.log('mongodb connected...');
};

module.exports = connectdb;
