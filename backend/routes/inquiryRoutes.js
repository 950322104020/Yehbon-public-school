const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth');

// @route   POST /api/inquiries
// @desc    Submit an admission inquiry form (Public)
router.post('/', async (req, res) => {
  const { parentName, studentName, email, phone, gradeApplied, message } = req.body;
  try {
    const newInquiry = new Inquiry({
      parentName,
      studentName,
      email,
      phone,
      gradeApplied,
      message
    });
    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', data: newInquiry });
  } catch (err) {
    res.status(500).json({ message: 'Server Error processing admission inquiry' });
  }
});

// @route   GET /api/inquiries
// @desc    Get all admission inquiries for the dashboard table (Admin Only)
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server Error fetching dashboard inquiries' });
  }
});

// @route   PATCH /api/inquiries/:id
// @desc    Update inquiry status (e.g., Reviewed, Contacted) (Admin Only)
router.patch('/:id', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    inquiry.status = status;
    await inquiry.save();
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Server Error updating status' });
  }
});

module.exports = router;