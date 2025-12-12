const Auth = require('../models/authModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jsonwebtoken.js'); 

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Email y contraseña son requeridos' 
                });
            }

            const user = await Auth.getByEmail(email);
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuario no encontrado' 
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Contraseña incorrecta' 
                });
            }

            const token = jwt.sign(
                { 
                    employee_id: user.employee_id, 
                    role: user.role,
                    email: user.email
                },
                jwtConfig.secret,
                { expiresIn: jwtConfig.expiresIn }
            );

            res.json({
                success: true,
                token,
                user: {
                    employee_id: user.employee_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (err) {
            console.error('Error en login:', err);
            res.status(500).json({ 
                success: false,
                message: 'Error interno del servidor',
                error: err.message 
            });
        }
    }, 
    
    logout: (req, res) => {
        try {
            res.json({ 
                success: true,
                message: 'Sesión cerrada exitosamente.'
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    }
};