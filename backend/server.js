const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Add near the top
require('dotenv').config();
const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic Production-Ready CORS Debugging & Authorization Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`[CORS DEBUG] Incoming Request: ${req.method} from Origin: ${origin} to Path: ${req.url}`);
  
  // Explicitly mirror the incoming origin back to satisfy credential requirements
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle serverless preflight OPTIONS check instantly
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Global Request Middleware Setup
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Wire App Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Root Operational Route
app.get('/', (req, res) => {
  res.send("Yehbon Public School API Running...");
});

// Fallback Port Listener for Local Development Only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;