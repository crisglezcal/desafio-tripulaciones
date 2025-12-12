const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const getAccessToken = require('../middlewares/getAccessToken.js');
const decodeToken = require('../middlewares/decodeToken.js');

// GET http://localhost:3000/api/mkt
router.get('/api/mkt', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getMkt);

// GET http://localhost:3000/api/hr
router.get('/api/hr', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getHr);

// GET http://localhost:3000/api/users
router.get('/api/users', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getAllUsers);

// GET http://localhost:3000/api/users/name
router.get('/api/users', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.getUserByName);

// POST http://localhost:3000/api/users
router.post('/api/users', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.createUser);

// PUT http://localhost:3000/api/users/:id
router.put('/api/users/:id', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.updateUserById);

// DELETE http://localhost:3000/api/users/:id
router.delete('/api/users/:id', getAccessToken, decodeToken, authMiddleware.isAdmin, adminController.deleteUserById);

