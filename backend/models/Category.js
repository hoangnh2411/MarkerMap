const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
  name: {
        type: String,
        required: true
    },

    iconColor: {
        type: String,
        required: true
    },

    iconColorText: {
        type: String,
        required: true
    },

    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }],

    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Category = mongoose.model('Category', CategorySchema);