const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);