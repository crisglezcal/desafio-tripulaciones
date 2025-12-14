import api from './api';


// GET http://localhost:3000/api/admin/users (ALL)
// GET http://localhost:3000/api/admin/users/:user_id (ID)
// POST http://localhost:3000/api/admin/users (CREATE USER)
// PUT http://localhost:3000/api/admin/users/:user_id (EDIT USER)
// DELETE http://localhost:3000/api/admin/users/:user_id (DELETE USER)

// GET http://localhost:3000/api/mkt
// GET http://localhost:3000/api/hr

//GET ALL USERS
export const getAllUsers = async () => {
    try {
        const response = await api.get(`admin/users`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Error fetching All Users:'};
    }
};

//GET USERS BY ID
export const getUserById = async(user_id )=>{


    try {
        const response = await api.get(`admin/users/${user_id }`);
        return response.data;
    } catch (error) {
         throw error.response?.data || { msg: 'Error fetching user by ID:'};
    }
       
}

//POST USER -> Create

export const createUser = async (userData) => {
    try {
        const response = await api.post(`admin/users`,userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Error creating new user' };
    }
};

//DELETE
export const deleteUserById = async (user_id) => {
    try {
        const response = await api.delete(`admin/users/${user_id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Error delete user' };
    }
};

//EDIT

export const updateUserById = async (user_id, userData) => {
    try {
        const response = await api.put(`admin/users/${user_id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Error edit user' };
    }
};

