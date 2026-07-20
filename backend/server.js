const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic Serverless-Safe Mongoose Connection Cache Middleware
let isConnected = false;
const connectDB = async (req, res, next) => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return next();
  }
  
  try {
    console.log("[SERVERLESS] Establishing new database socket connection...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout fast instead of leaving function hanging
    });
    isConnected = true;
    console.log("[SERVERLESS] Database linked cleanly.");
    next();
  } catch (err) {
    console.error("[DATABASE STATE FAULT]:", err.message);
    return res.status(500).json({ 
      message: "Database connection failed. Please ensure IP Whitelist is set to 0.0.0.0/0 in Atlas.",
      error: err.message 
    });
  }
};

// Global Edge CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Whitelist your domain variants safely
  const allowedOrigins = [
    'https://www.yehbonpublicschool.in',
    'https://yehbonpublicschool.in',
    'http://localhost:3000'
  ];

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Terminate OPTIONS requests instantly right here
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Primary Parser Handlers
app.use(express.json());
app.use(cookieParser());

// Inject Serverless DB Connection Pool Control
app.use(connectDB);

// Core App Route Mounting
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Root Gateway Diagnostic Route
app.get('/', (req, res) => {
  res.send("Yehbon Public School Serverless Engine Running Securely...");
});

// Fallback Port Listener for Local Development Only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;