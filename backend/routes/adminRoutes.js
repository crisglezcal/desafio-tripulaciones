const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRefreshCookie = require('../middlewares/checkRefreshCookie');
const { createUserValidator, updateUserValidator } = require('../validators/userValidator.js');
const handleValidationErrors = require('../middlewares/validate.js');

// // RUTAS SIN AUTENTICACIÓN PARA TESTING EN POSTMAN:
// // GET http://localhost:3000/api/admin/sales
// router.get('/sales', adminController.getSales);
// // GET http://localhost:3000/api/admin/customers
// router.get('/customers', adminController.getCustomers);
// // GET http://localhost:3000/api/admin/products
// router.get('/products', adminController.getProducts);
// // GET http://localhost:3000/api/admin/hr
// router.get('/hr', adminController.getHr);
// // GET http://localhost:3000/api/admin/users
// router.get('/users', adminController.getAllUsers);
// // GET http://localhost:3000/api/admin/users/:user_id
// router.get('/users/:user_id', adminController.getUserById);
// // POST http://localhost:3000/api/admin/users
// router.post('/users', adminController.createUser);
// // PUT http://localhost:3000/api/admin/users/:user_id
// router.put('/users/:user_id', adminController.updateUserById);
// // DELETE http://localhost:3000/api/admin/users/:user_id
// router.delete('/users/:user_id', adminController.deleteUserById);

// RUTAS DEFINITIVAS CON AUTENTICACIÓN:

/**
 * @swagger
 * tags:
 *   name: Administración
 *   description: Endpoints exclusivos para administradores
 */

/**
 * @swagger
 * /api/admin/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     description: Solo accesible para usuarios con rol de administrador
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida correctamente
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/sales', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getSales);

/**
 * @swagger
 * /api/admin/customers:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Solo accesible para usuarios con rol de administrador
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/customers', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getCustomers);

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Solo accesible para usuarios con rol de administrador
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/products', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getProducts);

/**
 * @swagger
 * /api/admin/hr:
 *   get:
 *     summary: Obtener información de recursos humanos
 *     description: Solo accesible para usuarios con rol de administrador
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de RRHH obtenidos correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/hr', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getHr);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Solo accesible para administradores
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/users', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{user_id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.get('/users/:user_id', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.getUserById);

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, marketing, hr, user]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.post('/users', createUserValidator, handleValidationErrors, authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.createUser);

/**
 * @swagger
 * /api/admin/users/{user_id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, marketing, hr, user]
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.put('/users/:user_id', updateUserValidator, handleValidationErrors, authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.updateUserById);

/**
 * @swagger
 * /api/admin/users/{user_id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de administrador
 */
router.delete('/users/:user_id', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireAdmin, adminController.deleteUserById);

module.exports = router;