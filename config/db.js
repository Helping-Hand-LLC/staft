const mongoose = require('mongoose');
const { mongoUri } = require('./keys');

const connectdb = () => {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.error(err));
};

module.exports = connectdb;
