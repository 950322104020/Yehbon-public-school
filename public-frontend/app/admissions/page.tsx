'use client';
import { useState, FormEvent } from 'react';
import api from '../../utils/api';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    gradeApplied: 'Nursery',
    message: '',
  });

  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const grades = [
    'Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 
    'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 
    'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'idle', message: '' });

    try {
      // Send data to the Express backend endpoint
      await api.post('/inquiries', formData);
      
      setStatus({
        type: 'success',
        message: 'Application inquiry submitted successfully! Our admissions deck will connect with you shortly.',
      });

      // Clear the form after a successful upload
      setFormData({
        parentName: '',
        studentName: '',
        email: '',
        phone: '',
        gradeApplied: 'Nursery',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Failed to dispatch inquiry data. Please check your connection parameters and try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Banner Section */}
        <div className="bg-blue-950 text-white p-8 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admissions Registration</h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
            Take the first step toward building an exceptional academic roadmap for your child at Noida Heights Academy.
          </p>
        </div>

        {/* Dynamic Status Notifications */}
        {status.type !== 'idle' && (
          <div className={`p-4 mx-8 mt-6 rounded-lg text-sm font-semibold transition-all ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {status.message}
          </div>
        )}

        {/* Lead Capture Form UI */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Parent Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Parent / Guardian Name</label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Student Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Student Full Name</label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="Alex Doe"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="parent@example.com"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Mobile Contact Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

          </div>

          {/* Grade Selector Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Target Entry Class / Grade</label>
            <select
              value={formData.gradeApplied}
              onChange={(e) => setFormData({ ...formData, gradeApplied: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Optional Message Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Additional Remarks / Questions (Optional)</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none"
              placeholder="Inquire about custom transport channels, hostel structures, etc..."
            />
          </div>

          {/* Submission Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-lg transition-colors shadow-lg uppercase tracking-wider text-sm"
            >
              Submit Admission Inquiry
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}