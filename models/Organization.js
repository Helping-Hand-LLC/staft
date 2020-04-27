const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({
  isPrivate: {
    type: Boolean,
    defualt: false
  }
});

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
