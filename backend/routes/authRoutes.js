const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    // Generate JWT Token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;