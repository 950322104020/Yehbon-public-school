const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dns=require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'https://yehbon-public-school-tm8e-git-main-950322104020s-projects.vercel.app'
];

const corsOptions = {
  // Foolproof function: automatically accepts and mirrors ANY incoming frontend URL
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Wire Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
// (Note: Gallery and Inquiry routes will wrap around this same clean architecture pattern)
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

app.get('/', (req, res) => {
  res.send("Yehbon Public School API Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});