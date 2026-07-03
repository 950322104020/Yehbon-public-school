const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const auth = require('../middleware/auth');

// Get all notices (Public)
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a notice (Admin Only)
router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const newNotice = new Notice({ title, content, category });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a notice (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notice removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;