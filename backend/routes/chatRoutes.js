const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); 
const checkRefreshCookie = require("../middlewares/checkRefreshCookie");
const { sendMessage } = require("../controllers/chatController");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Endpoints para el sistema de chat
 */

/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     summary: Enviar un mensaje al chat
 *     description: Envía un mensaje al sistema de chat (requiere autenticación)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Contenido del mensaje
 *               userId:
 *                 type: integer
 *                 description: ID del usuario que envía el mensaje
 *     responses:
 *       200:
 *         description: Mensaje enviado exitosamente
 *       400:
 *         description: Mensaje vacío o inválido
 *       401:
 *         description: No autorizado - Token inválido o expirado
 */
router.post("/message", 
    authMiddleware.authenticate,   // Extrae y verifica token
    checkRefreshCookie,            // Si expiró, refresca con cookie  
    authMiddleware.isAuthenticated, // Verifica que esté autenticado
    sendMessage
);

module.exports = router;