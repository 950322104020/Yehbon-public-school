const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dns = require('dns');

// Force IPv4 DNS lookup to prevent connection issues across cloud environments
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. GLOBAL CORS MIDDLEWARE
// ==========================================
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  const allowedOrigins = [
    'https://www.yehbonpublicschool.in',
    'https://yehbonpublicschool.in',
    'https://www.ramodevischool.in', // Added for new school
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  // Match explicitly allowed origins or Vercel preview URLs
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Terminate preflight OPTIONS requests immediately
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// ==========================================
// 2. PARSERS & BODY HANDLERS
// ==========================================
app.use(express.json());
app.use(cookieParser());

// ==========================================
// 3. API ROUTE MOUNTING
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Diagnostic Root Gateway
app.get('/', (req, res) => {
  res.send("School API Engine Running Live on Render...");
});

// ==========================================
// 4. MONGODB CONNECTION & SERVER START
// ==========================================
const startServer = async () => {
  try {
    console.log("[RENDER] Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("[RENDER] Database linked successfully.");

    app.listen(PORT, () => {
      console.log(`[RENDER] Server actively listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("[DATABASE CONNECTION FAULT]:", err.message);
    process.exit(1); // Exit process so Render logs the error clearly
  }
};

startServer();

module.exports = app;