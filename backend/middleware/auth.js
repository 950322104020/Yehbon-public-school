const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = null;

  // 1. Try to extract from Authorization Header (Bearer <TOKEN>)
  if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer ')) {
    token = req.header('Authorization').split(' ')[1];
  } 
  // 2. Fallback: Try to extract from Cookies (since Axios withCredentials is true)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 3. Last resort fallback: Check unparsed raw headers just in case Vercel holds it there
  else if (req.headers.cookie) {
    // Basic regex parser to grab the 'token=' value out of raw cookie string
    const match = req.headers.cookie.match(/token=([^;]+)/);
    if (match) token = match[1];
  }

  // If no token found anywhere, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token found, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if your login payload uses decoded.adminId or decoded.id
    req.admin = decoded.adminId || decoded.id; 
    
    next();
  } catch (err) {
    console.error("[AUTH MIDDLEWARE ERROR]:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};