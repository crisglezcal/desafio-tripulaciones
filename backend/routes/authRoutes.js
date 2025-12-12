const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController.js');
const getAccessToken = require('../middlewares/getAccessToken.js');
const decodeToken = require('../middlewares/decodeToken.js');

// POST http://localhost:3000/api/login
router.post('/login', authController.login);

// POST http://localhost:3000/api/logout
router.post('/logout', getAccessToken, decodeToken, authController.logout);