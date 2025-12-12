// Verifica token + verifica role "admin"

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jsonwebtoken.js');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token requerido' });
    
    try {
        req.user = jwt.verify(token, jwtConfig.secret);
        next();
    } catch {
        res.status(403).json({ error: 'Token inválido' });
    }
};


authMiddleware.isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    res.status(403).json({ error: 'Acceso solo para administradores' });
};

module.exports = authMiddleware;