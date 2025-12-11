const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google auth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = req.user.token;
        const redirectUrl = `${process.env.FRONTEND_REDIRECT_URL}?token=${token}`;
        return res.redirect(redirectUrl);
    }
);

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcto
 */

/**
 * @openapi
 * /api/auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Login con Google OAuth
 *     responses:
 *       302:
 *         description: Redirección a Google
 */

/**
 * @openapi
 * /api/auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Callback de Google OAuth
 *     responses:
 *       302:
 *         description: Redirige al frontend con token
 */


module.exports = router;
