const Admin = require('../models/adminModel.js');
const Mkt = require('../models/mktModel.js');      
const Hr = require('../models/hrModel.js');          
const Auth = require('../models/authModel.js');   

module.exports = {

    getMkt: async (req, res) => {
        try {
            const mktView = await Mkt.getAll();
            res.json({
                success: true,
                data: mktView
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
            const hrView = await Hr.getAll();
            res.json({
                success: true,
                data: hrView
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
            const users = await Auth.getAll(); 
            res.json({
                success: true,
                data: users
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    getUserByName: async (req, res) => {
        try {
            const user = await Auth.getByName(req.params.first_name);
            if (!user) return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
            res.json({
                success: true,
                data: user
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await Auth.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: newUser
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { user_id } = req.params; 
            const updatedUser = await Auth.update(user_id, req.body);
            
            if (!updatedUser) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Usuario no encontrado' 
                });
            }
            
            res.json({
                success: true,
                message: 'Usuario actualizado correctamente',
                data: updatedUser
            });
            
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ 
                success: false,
                message: 'Error al actualizar usuario',
                error: err.message 
            });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            
            if (!user_id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario requerido'
                });
            }
            
            const deletedUser = await Auth.delete(user_id);
            
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: `Usuario con ID ${user_id} no encontrado`
                });
            }
            
            res.json({
                success: true,
                message: 'Usuario eliminado exitosamente',
                data: deletedUser
            });
            
        } catch (err) {
            console.error(`Error al eliminar usuario ID ${req.params.user_id}:`, err);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar usuario',
                error: err.message
            });
        }
    }
};