// Solo verifica departamentos específicos
const isHR = (req, res, next) => {
    if (req.user?.role === 'hr') return next();
    res.status(403).json({ error: 'Acceso solo para RRHH' });
};

const isMKT = (req, res, next) => {
    if (req.user?.role === 'mkt') return next();
    res.status(403).json({ error: 'Acceso solo para Marketing' });
};

module.exports = { isHR, isMKT };