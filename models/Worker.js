const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'n/a']
  },
  ssn: {
    type: String,
    // TODO: encrypt?
  },
  isManager: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  driversLicense: String,
  w9: String,
  w4: String,
  i9: String
});

workerSchema.pre('save', (next) => {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      next();
    });
  });
});

workerSchema.methods.isValidPassword = (password) => {
  const user = this;

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    return isMatch ? true : false;
  });
}

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;