const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('Authorization')?.split(' ')[1]; // Expects "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.adminId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};