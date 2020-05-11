const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  isManager: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  phone: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  ssn: {
    type: String,
    required: true
  }
  // TODO: supporting documents: driver's license, w9, w4, i9
  // TODO: extra organization fields
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
