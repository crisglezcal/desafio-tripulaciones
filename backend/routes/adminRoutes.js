const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
//EXPRESS VALIDATOR
const { createUserValidator, updateUserValidator } = require('../validators/userValidator.js');
const handleValidationErrors = require('../middlewares/validate.js');
// RUTAS SIN AUTENTICACIÓN PARA TESTING EN POSTMAN:

// GET http://localhost:3000/api/admin/sales
router.get('/sales', adminController.getSales);
// GET http://localhost:3000/api/admin/customers
router.get('/customers', adminController.getCustomers);
// GET http://localhost:3000/api/admin/products
router.get('/products', adminController.getProducts);
// GET http://localhost:3000/api/admin/hr
router.get('/hr', adminController.getHr);

// GET http://localhost:3000/api/admin/users
router.get('/users', adminController.getAllUsers);
// GET http://localhost:3000/api/admin/users/:user_id
router.get('/users/:user_id', adminController.getUserById);
// POST http://localhost:3000/api/admin/users
router.post('/users',createUserValidator, handleValidationErrors, adminController.createUser);
// PUT http://localhost:3000/api/admin/users/:user_id
router.put('/users/:user_id',updateUserValidator,handleValidationErrors, adminController.updateUserById);
// DELETE http://localhost:3000/api/admin/users/:user_id
router.delete('/users/:user_id', adminController.deleteUserById);

// RUTAS DEFINITIVAS CON AUTENTICACIÓN:

// // GET http://localhost:3000/api/admin/sales
// router.get('/sales', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getSales);

// // GET http://localhost:3000/api/admin/customers
// router.get('/customers', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getCustomers);

// // GET http://localhost:3000/api/admin/products
// router.get('/products', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getProducts);

// // GET http://localhost:3000/api/admin/hr
// router.get('/hr', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getHr);

// // GET http://localhost:3000/api/admin/users
// router.get('/users', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getAllUsers);

// // GET http://localhost:3000/api/admin/users/:user_id
// router.get('/users/:user_id', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getUserById);

// // POST http://localhost:3000/api/admin/users
// router.post('/users', getAccessToken, decodeToken, authMiddleware.isAdmin,createUserValidator, handleValidationErrors, adminController.createUser);

// // PUT http://localhost:3000/api/admin/users/:user_id
// router.put('/users/:user_id', getAccessToken, decodeToken, authMiddleware.isAdmin,updateUserValidator,handleValidationErrors, adminController.updateUserById);

// // DELETE http://localhost:3000/api/admin/users/:user_id
// router.delete('/users/:user_id', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.deleteUserById);

module.exports = router;