const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dns = require('dns');

// Force IPv4 DNS lookup to prevent MongoDB Atlas connection drops in Vercel
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. GLOBAL CORS MIDDLEWARE (MUST RUN FIRST)
// ==========================================
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  const allowedOrigins = [
    'https://www.yehbonpublicschool.in',
    'https://yehbonpublicschool.in',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  // Match allowed origins or any Vercel preview URL
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Terminate preflight OPTIONS requests immediately with 204 No Content
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
// 3. SERVERLESS MONGOOSE CONNECTION CACHE
// ==========================================
let isConnected = false;

const connectDB = async (req, res, next) => {
  // If connection exists and is ready (readyState === 1), move to next middleware
  if (isConnected && mongoose.connection.readyState === 1) {
    return next();
  }
  
  try {
    console.log("[SERVERLESS] Establishing new database socket connection...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout fast instead of hanging Vercel execution
    });
    isConnected = true;
    console.log("[SERVERLESS] Database linked cleanly.");
    next();
  } catch (err) {
    console.error("[DATABASE STATE FAULT]:", err.message);
    return res.status(500).json({ 
      message: "Database connection failed. Ensure IP Whitelist is set to 0.0.0.0/0 in MongoDB Atlas.",
      error: err.message 
    });
  }
};

// Inject DB connection middleware BEFORE mounting API routes
app.use(connectDB);

// ==========================================
// 4. API ROUTE MOUNTING
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Diagnostic Root Gateway
app.get('/', (req, res) => {
  res.send("Yehbon Public School Serverless Engine Running Securely...");
});

// Fallback listener for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;