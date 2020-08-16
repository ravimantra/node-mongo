const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access denied!');
  }
  try {
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = varified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}

module.exports = verifyToken;