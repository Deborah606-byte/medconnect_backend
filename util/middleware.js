// middleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'MedConnect@rualinstitution';

// Middleware to authenticate user and attach user object to req.user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log(decoded)
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded; // Attach the decoded token payload to req.user
    next();
  });
}

module.exports = { authenticateUser };
