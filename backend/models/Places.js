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
    address: {
        type: String,
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    website_link: {
        type: String,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Place = mongoose.model('Place', PlaceSchema);