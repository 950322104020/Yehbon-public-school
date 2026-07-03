const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, default: 'Campus' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);