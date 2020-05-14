const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address_components: {
    long_name: String,
    short_name: String
  },
  formattedAddress: {
    type: String,
    required: true
  },
  formatted_phone_number: String,
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
  },
  url: String,
  website: String
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
