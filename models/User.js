const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'worker',
    enum: ['client', 'worker', 'manager', 'admin']
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

module.exports = User = mongoose.model('User', userSchema);
