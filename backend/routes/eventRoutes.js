const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events sorted by upcoming date (Public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server Error fetching events' });
  }
});

// @route   POST /api/events
// @desc    Create a new event record (Admin Only)
router.post('/', auth, async (req, res) => {
  const { title, description, eventDate, location } = req.body;
  try {
    const newEvent = new Event({ title, description, eventDate, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Server Error creating event' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event record (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const eventItem = await Event.findById(req.params.id);
    if (!eventItem) return res.status(404).json({ message: 'Event not found' });
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error deleting event' });
  }
});

module.exports = router;