const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`[CORS DEBUG] Incoming Request: ${req.method} from Origin: ${origin} to Path: ${req.url}`);
  

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// Global Middleware Setup
app.use(cors(corsOptions));
app.use(express.json());

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

// Boot Server Engine
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});