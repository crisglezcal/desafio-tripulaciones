const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // req.user.id_user estará disponible
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
