const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  formatted_address: {
    type: String,
    required: true
  },
  geometry: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  icon: String,
  name: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
