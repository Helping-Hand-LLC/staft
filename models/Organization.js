const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  isPrivate: {
    type: Boolean,
    defualt: false
  }
});

const Organization = mongoose.model('Organization', orgSchema);
module.exports = Organization;
