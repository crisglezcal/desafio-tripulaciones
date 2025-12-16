const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRefreshCookie = require('../middlewares/checkRefreshCookie');

// // RUTAS SIN AUTENTICACIÓN PARA TESTING EN POSTMAN:
// // GET http://localhost:3000/api/hr/employees
// router.get('/employees', hrController.getAllEmployees);
// // GET http://localhost:3000/api/hr/employees/:employee_id
// router.get('/employees/:employee_id', hrController.getEmployeeById);
// // GET http://localhost:3000/api/hr/employees/name/:first_name
// router.get('/employees/name/:first_name', hrController.getEmployeeByName);
// // POST http://localhost:3000/api/hr/employees
// router.post('/employees', hrController.createEmployee);
// // PUT http://localhost:3000/api/hr/employees/:employee_id
// router.put('/employees/:employee_id', hrController.updateEmployeeById);
// // DELETE http://localhost:3000/api/hr/employees/:employee_id
// router.delete('/employees/:employee_id', hrController.deleteEmployeeById);

// RUTAS DEFINITIVAS CON AUTENTICACIÓN:

/**
 * @swagger
 * tags:
 *   name: Recursos Humanos
 *   description: Endpoints exclusivos para el departamento de RRHH
 */

/**
 * @swagger
 * /api/hr/employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Solo accesible para usuarios con rol de RRHH
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida correctamente
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.get('/employees', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.getAllEmployees);

/**
 * @swagger
 * /api/hr/employees/{employee_id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.get('/employees/:employee_id', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.getEmployeeById);

/**
 * @swagger
 * /api/hr/employees/name/{first_name}:
 *   get:
 *     summary: Buscar empleados por nombre
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: first_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del empleado a buscar
 *     responses:
 *       200:
 *         description: Lista de empleados con ese nombre
 *       404:
 *         description: No se encontraron empleados con ese nombre
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.get('/employees/name/:first_name', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.getEmployeeByName);

/**
 * @swagger
 * /api/hr/employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - department
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.post('/employees', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.createEmployee);

/**
 * @swagger
 * /api/hr/employees/{employee_id}:
 *   put:
 *     summary: Actualizar un empleado por ID
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.put('/employees/:employee_id', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.updateEmployeeById);

/**
 * @swagger
 * /api/hr/employees/{employee_id}:
 *   delete:
 *     summary: Eliminar un empleado por ID
 *     tags: [Recursos Humanos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido - No tienes permisos de RRHH
 */
router.delete('/employees/:employee_id', authMiddleware.authenticate, checkRefreshCookie, authMiddleware.requireHR, hrController.deleteEmployeeById);

module.exports = router;