const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'worker',
    enum: ['client', 'worker']
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
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
