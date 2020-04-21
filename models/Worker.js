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
    required: true,
    minlength: 6
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

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;