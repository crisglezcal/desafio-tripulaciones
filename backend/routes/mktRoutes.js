const express = require('express');
const router = express.Router();
const mktController = require('../controllers/mktController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const departmentMiddleware = require('../middlewares/departmentMiddleware.js');
const getAccessToken = require('../middlewares/getAccessToken.js');
const decodeToken = require('../middlewares/decodeToken.js');

// GET http://localhost:3000/api/mkt
router.get('/api/mkt', getAccessToken, decodeToken, authMiddleware, departmentMiddleware.isMKT, mktController.getMkt);
