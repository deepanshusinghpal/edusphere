const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --- THIS IS THE CRITICAL FIX ---
    // We now expect a simple, "flat" payload, so we can assign it directly.
    // This ensures req.user is always a clean object with 'id' and 'role'.
    req.user = decoded;
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

