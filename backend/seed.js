const mongoose = require('mongoose');
const path = require('path');
// Ensures .env is read cleanly relative to the backend workspace root directory
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import our models
const Notice = require('./models/Notice');
const Gallery = require('./models/Gallery');
const Inquiry = require('./models/Inquiry');
const Admin = require('./models/Admin');

// Sample Data Arrays
const sampleNotices = [
  {
    title: "Admissions Open for Academic Session 2026-2027",
    content: "We are pleased to announce that registrations for the upcoming academic year are now open for Nursery through Grade XI. Prospectus and digital registration forms are available on our admissions portal. Limited seats available.",
    category: "Admission"
  },
  {
    title: "Annual Sports Meet '26 Postponement Notice",
    content: "Please note that due to unexpected weather forecasts, the Annual Sports Meet originally scheduled for this Friday has been moved to next Monday. Timings and venue arrangements remain identical.",
    category: "General"
  },
  {
    title: "Mid-Term Examination Schedule & Syllabus",
    content: "The comprehensive date sheet along with detailed syllabus guidelines for the Mid-Term evaluations has been dispatched to parents' registered emails and uploaded onto the portal.",
    category: "Exam"
  },
  {
    title: "Noida Robotics Championship Triumph",
    content: "Proud moment for Noida Heights Academy! Our senior robotics team secured the 1st runner-up position at the Inter-School STEM Challenge held yesterday. Hearty congratulations to the participants!",
    category: "Academic"
  }
];

const sampleGallery = [
  {
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200",
    caption: "State-of-the-art modern campus building and entrance.",
    category: "Campus"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200",
    caption: "Students engaged in collaborative hands-on science experiments.",
    category: "Academics"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
    caption: "Interactive interactive smart classrooms maximizing learning potentials.",
    category: "Classroom"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=1200",
    caption: "Annual football tournament matches organized on our main sports turf.",
    category: "Sports"
  }
];

const sampleInquiries = [
  {
    parentName: "Rajesh Kumar",
    studentName: "Aarav Kumar",
    email: "rajesh.k@example.com",
    phone: "+919876543210",
    gradeApplied: "Grade 5",
    message: "Looking for details on school transport routes around Sector 62, Noida.",
    status: "Pending"
  },
  {
    parentName: "Ananya Sharma",
    studentName: "Riya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+919999888777",
    gradeApplied: "Nursery",
    message: "Could you provide information regarding the fee structure and quarterly schedules?",
    status: "Reviewed"
  }
];

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your environment variables!");
    }

    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas for seeding...");

    // Clear existing collections safely to avoid duplicated duplicates
    await Notice.deleteMany({});
    await Gallery.deleteMany({});
    await Inquiry.deleteMany({});
    console.log("Cleared old database records.");

    // Insert new sample records
    await Notice.insertMany(sampleNotices);
    await Gallery.insertMany(sampleGallery);
    await Inquiry.insertMany(sampleInquiries);
    console.log("Notices, Gallery, and Inquiries collections successfully seeded!");

    // Seed or normalize the default Admin account credentials safely
    const existingAdmin = await Admin.findOne({ username: "TerryMize" });
    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        username: "TerryMize",
        password: "Terry@95822" // Pre-save hook hashes this password automatically
      });
      await defaultAdmin.save();
      console.log("Default admin account created -> User: TerryMize | Pass: Terry@95822");
    } else {
      console.log("Admin profile TerryMize already exists; skipping duplicate account injection.");
    }

    console.log("Data seeding completely successful.");
    process.exit(0);
  } catch (error) {
    console.error("Error during database seeding operations:", error);
    process.exit(1);
  }
};

seedDatabase();