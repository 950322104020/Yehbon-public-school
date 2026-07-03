const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gradeApplied: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Contacted'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);