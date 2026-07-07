const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: function (origin, callback) {
    // Allows server-to-server requests or tools like Postman
    if (!origin) return callback(null, true);
    // Explicitly approve the incoming origin automatically
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
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