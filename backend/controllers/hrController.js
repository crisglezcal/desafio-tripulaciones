const Hr = require('../models/hrModel.js');

module.exports = {

    getAllEmployees: async (req, res) => {
        try {
            const employeesView = await Hr.getAll();
            res.json(employeesView);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getEmployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await Hr.getById(id); 
            
            if (!employee) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Empleado no encontrado' 
                });
            }
            
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getEmployeeByName: async (req, res) => {
        try {
            const { name } = req.params;
            const employee = await Hr.getByName(name); 
            
            if (!employee) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Empleado no encontrado' 
                });
            }
            
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createEmployee: async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos del empleado requeridos'
                });
            }
            
            const newEmployee = await Hr.create(req.body); 
            
            res.status(201).json({
                success: true,
                message: 'Empleado creado exitosamente',
                data: newEmployee
            });
        } catch (err) {
            console.error('Error al crear empleado:', err);
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    updateEmployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de empleado requerido'
                });
            }
            
            const updatedEmployee = await Hr.update(id, req.body);
            
            if (!updatedEmployee) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Empleado no encontrado' 
                });
            }
            
            res.json({
                success: true,
                message: 'Empleado actualizado correctamente',
                data: updatedEmployee
            });
        } catch (err) {
            console.error('Error al actualizar empleado:', err);
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    },

    deleteEmployeeById: async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de empleado requerido'
                });
            }
            
            const deletedEmployee = await Hr.delete(id);
            
            if (!deletedEmployee) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Empleado no encontrado' 
                });
            }
            
            res.json({
                success: true,
                message: 'Empleado eliminado exitosamente',
                data: deletedEmployee
            });
        } catch (err) {
            console.error('Error al eliminar empleado:', err);
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    }
};