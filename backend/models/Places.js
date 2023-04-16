const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat_code: {
    type: Number,
    required: true
  },
  lng_code: {
    type: Number,
    required: true
  },
  
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Place = mongoose.model('place', PlaceSchema);