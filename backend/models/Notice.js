const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['General', 'Academic', 'Admission', 'Exam'], default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', NoticeSchema);