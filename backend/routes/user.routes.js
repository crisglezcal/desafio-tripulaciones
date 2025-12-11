const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.midleware");

router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers); // solo admin puede listar todos
router.get('/:id', authMiddleware, userController.getUserById); // cualquiera puede ver un usuario (opcional)
router.post('/', authMiddleware, adminMiddleware, userController.createUser); // solo admin puede crear
router.put('/:id', authMiddleware, userController.updateUser); // admin y user pueden actualizar
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser); // solo admin puede borrar

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios (solo admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo admin puede acceder
 */

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Crear usuario (solo admin)
 *     security:
 *       - bearerAuth: []
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
 *         description: Usuario creado
 */

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Actualizar usuario (admin o dueño de la cuenta)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Eliminar usuario (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */


module.exports = router;
