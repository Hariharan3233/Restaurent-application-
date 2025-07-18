const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSuperSecretKey';

function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
}
module.exports=isAuthenticated;