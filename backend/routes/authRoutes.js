const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const { loginValidator } = require('../validators/authValidator.js');
const handleValidationErrors = require('../middlewares/validate.js');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints de login, logout y gestión de tokens
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@empresa.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Cookie con refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', loginValidator, handleValidationErrors, authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refrescar token de acceso
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Nuevo token generado exitosamente
 *         headers:
 *           X-New-Access-Token:
 *             schema:
 *               type: string
 *             description: Nuevo token de acceso en la cabecera
 *       401:
 *         description: Refresh token inválido o expirado
 */
router.post('/refresh', authController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Cookie de refresh token eliminada
 *       401:
 *         description: No autorizado
 */
router.post('/logout', authMiddleware.authenticate, authController.logout);

module.exports = router;