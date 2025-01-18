const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  genres: [{
    type: String,
    required: true
  }],
  awards: [{
    name: String,
    year: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema); 