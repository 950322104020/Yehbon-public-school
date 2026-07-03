const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');

// @route   GET /api/gallery
// @desc    Get all gallery images (Public)
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server Error fetching gallery' });
  }
});

// @route   POST /api/gallery
// @desc    Add a new gallery image URL (Admin Only)
router.post('/', auth, async (req, res) => {
  const { imageUrl, caption, category } = req.body;
  try {
    const newImage = new Gallery({ imageUrl, caption, category });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Server Error saving gallery image' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery image (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery image removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error deleting gallery image' });
  }
});

module.exports = router;