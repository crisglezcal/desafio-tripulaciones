const Admin = require('../models/adminModel.js');

module.exports = {

    getSales: async (req, res) => {
        try {
            const sales = await Admin.getSales();  
            res.json({
                success: true,
                count: sales.length,
                data: sales
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getCustomers: async (req, res) => {
        try {
            const customers = await Admin.getCustomers();  
            res.json({
                success: true,
                count: customers.length,
                data: customers
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Admin.getProducts();  
            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getHr: async (req, res) => {
        try {
            const hrEmployees = await Admin.getHr();  
            res.json({
                success: true,
                count: hrEmployees.length,
                data: hrEmployees
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await Admin.getAllUsers();  
            res.json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const user = await Admin.getUserById(user_id); 
            res.json({
                success: true,
                data: user
            });
        } catch (err) {
            res.status(404).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    createUser: async (req, res) => {
        console.log('CreateUser body:', req.body);
        try {
            const result = await Admin.createUser(req.body); 
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const result = await Admin.updateUserById(user_id, req.body);  
            res.json(result);
        } catch (err) {
            res.status(400).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const result = await Admin.deleteUserById(user_id);  
            res.json(result);
        } catch (err) {
            res.status(400).json({ 
                success: false,
                error: err.message 
            });
        }
    }
};