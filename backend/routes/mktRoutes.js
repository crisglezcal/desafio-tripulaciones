const express = require('express');
const router = express.Router();
const mktController = require('../controllers/mktController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRefreshCookie = require('../middlewares/checkRefreshCookie');

// // RUTAS SIN AUTENTICACIÓN PARA TESTING EN POSTMAN:
// // GET http://localhost:3000/api/mkt/sales
// router.get('/sales', mktController.getSales);
// // GET http://localhost:3000/api/mkt/customers
// router.get('/customers', mktController.getCustomers);
// // GET http://localhost:3000/api/mkt/products
// router.get('/products', mktController.getProducts);

// RUTAS DEFINITIVAS CON AUTENTICACIÓN:

/**
 * @swagger
 * tags:
 *   name: Marketing
 *   description: Endpoints exclusivos para el departamento de Marketing
 */

/**
 * @swagger
 * /api/mkt/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     description: Solo accesible para usuarios con rol de Marketing
 *     tags: [Marketing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida correctamente
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       403:
 *         description: Prohibido - No tienes permisos de Marketing
 */
router.get('/sales', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireMarketing, mktController.getSales);

/**
 * @swagger
 * /api/mkt/customers:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Solo accesible para usuarios con rol de Marketing
 *     tags: [Marketing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de Marketing
 */
router.get('/customers', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireMarketing, mktController.getCustomers);

/**
 * @swagger
 * /api/mkt/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Solo accesible para usuarios con rol de Marketing
 *     tags: [Marketing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de productos por página
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                       product_name:
 *                         type: string
 *                       category:
 *                         type: string
 *                       unit_price:
 *                         type: number
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de Marketing
 */
router.get('/products', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireMarketing, mktController.getProducts);

module.exports = router;