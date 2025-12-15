const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController.js');
const getAccessToken = require('../middlewares/getAccessToken.js');
const decodeToken = require('../middlewares/decodeToken.js');
//ExpressValidator
const { loginValidator } = require('../validators/authValidator.js');
const handleValidationErrors = require('../middlewares/validate.js');

// POST http://localhost:3000/api/auth/login
router.post('/login',loginValidator,handleValidationErrors, authController.login);

// POST http://localhost:3000/api/auth/logout
router.post('/logout', getAccessToken, decodeToken, authController.logout);

module.exports = router;
