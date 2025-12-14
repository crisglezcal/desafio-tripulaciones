import api from './api';

// POST http://localhost:3000/auth/login
// POST http://localhost:3000/auth/logout
// LOG IN
export const login = async (userData) => {
    try {
        const response = await api.post(`auth/login`,userData);
        // Guardar token en localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Error en login' };
    }
};

//LOG OUT
export const logout = async () => {
    try {  
        // Eliminar token local
        localStorage.removeItem('token');

        const response = await api.post(`auth/logout`);
        return response.data;
    
    } catch (error) {
        throw error.response?.data || { msg: 'Error en logout' };
    }
};
    //  localStorage.removeItem('token'); // borra el token
    // window.location.href = '/login';   // opcional: redirigir
    // return { success: true, message: 'Logout ok' };