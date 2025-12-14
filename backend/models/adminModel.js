const pool = require('../config/db');
const queries = require('../queries/adminQueries');
const bcrypt = require('bcrypt');

const getSales = async () => {
  try {
    const result = await pool.query(queries.getSales);
    return result.rows;
  } catch (error) {
    throw new Error('Error al mostrar las ventas: ' + error.message);
  }
};

const getCustomers = async () => {
  try {
    const result = await pool.query(queries.getCustomers);
    return result.rows;
  } catch (error) {
    throw new Error('Error al mostrar los clientes: ' + error.message);
  }
};

const getProducts = async () => {
  try {
    const result = await pool.query(queries.getProducts);
    return result.rows;
  } catch (error) {
    throw new Error('Error al mostrar los productos: ' + error.message);
  }
};

const getHr = async () => {
  try {
    const result = await pool.query(queries.getHr);
    return result.rows;
  } catch (error) {
    throw new Error('Error al mostrar Dpto. RRHH: ' + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query(queries.getAllUsers);
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};

const getUserById = async (user_id) => {  
  try {
    const result = await pool.query(queries.getUserById, [user_id]);
    if (result.rows.length === 0) {
      throw new Error(`Usuario con ID ${user_id} no encontrado`);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener usuario por ID: ' + error.message);
  }
};

const createUser = async (userData) => {
  const {role, email, password } = userData;
  
  try {

    if ( !role || !email || !password) {
      throw new Error('Todos los campos son requeridos');
    }
    
    const validRoles = ['admin', 'hr', 'mkt'];
    if (!validRoles.includes(role.toLowerCase())) {
      throw new Error('Rol inválido. Los roles permitidos son: admin, hr, mkt');
    }
    
    //Hashear contraseñas
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(queries.createUser, [
      role.toLowerCase(),
      email,
      hashedPassword
    ]);
    
    return {
      message: 'Usuario creado exitosamente',
      user: result.rows[0]
    };
  } catch (error) {
    console.error('Error creando usuario en DB:', error);
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

const updateUserById = async (user_id, userData) => {  
  try {

    const existingUser = await pool.query(queries.getUserById, [user_id]);
    if (existingUser.rows.length === 0) {
      throw new Error(`Usuario con ID ${user_id} no encontrado`);
    }
    
    const {role, email, password } = userData;


    // 🔹 Si hay nueva contraseña, la hasheamos
    let hashedPassword;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updateData = {
      role: role ? role.toLowerCase() : existingUser.rows[0].role,
      email: email || existingUser.rows[0].email,
      password: hashedPassword || existingUser.rows[0].password
    };
    
    if (role) {
      const validRoles = ['admin', 'hr', 'mkt'];
      if (!validRoles.includes(updateData.role)) {
        throw new Error('Rol inválido. Los roles permitidos son: admin, hr, mkt');
      }
    }
    
    const result = await pool.query(queries.updateUserById, [
      // updateData.employee_id,
      updateData.role,
      updateData.email,
      updateData.password,
      user_id  
    ]);
    
    return {
      message: 'Usuario actualizado exitosamente',
      user: result.rows[0]
    };
  } catch (error) {
    console.error('Error editando usuario en DB:', error);
    throw new Error('Error al actualizar usuario: ' + error.message);
  }
};

const deleteUserById = async (user_id) => {  
  try {

    const existingUser = await pool.query(queries.getUserById, [user_id]);
    if (existingUser.rows.length === 0) {
      throw new Error(`Usuario con ID ${user_id} no encontrado`);
    }
    
    await pool.query(queries.deleteUserById, [user_id]);  
    
    return {
      message: `Usuario con ID ${user_id} eliminado exitosamente`,
      deletedUser: existingUser.rows[0]
    };
  } catch (error) {
    throw new Error('Error al eliminar usuario: ' + error.message);
  }
};

module.exports = {
    getSales,
    getCustomers,
    getProducts,
    getHr,
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};