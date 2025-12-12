const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const departmentMiddleware = require('../middlewares/departmentMiddleware.js');
const getAccessToken = require('../middlewares/getAccessToken.js');
const decodeToken = require('../middlewares/decodeToken.js');

// GET http://localhost:3000/api/rrhh
router.get('/api/rrhh', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.getAllEmployees);

// GET http://localhost:3000/api/rrhh/:id
router.get('/api/rrhh', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.getEmployeeById);

// GET http://localhost:3000/api/rrhh/:name
router.get('/api/rrhh', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.getEmployeeByName);

// POST http://localhost:3000/api/rrhh
router.post('/api/rrhh', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.createEmployee);

// PUT http://localhost:3000/api/rrhh/:id
router.put('/api/rrhh/:id', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.updateEmployeeById);

// DELETE http://localhost:3000/api/rrhh/:id
router.delete('/api/rrhh/:id', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isHR, hrController.deleteEmployeeById);

