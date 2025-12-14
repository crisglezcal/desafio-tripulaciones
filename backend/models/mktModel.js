const pool = require('../config/db');
const queries = require('../queries/mktQueries');

/**
 * SALES PAGINADAS
 */
const getSalesPaginated = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const salesResult = await pool.query(
      queries.getSalesPaginated,
      [limit, offset]
    );

    const countResult = await pool.query(queries.countSales);
    const total = Number(countResult.rows[0].total);

    return {
      data: salesResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(`Error al mostrar las ventas: ${error.message}`);
  }
};

/**
 * CUSTOMERS PAGINADOS
 */
const getCustomersPaginated = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const customersResult = await pool.query(
      queries.getCustomersPaginated,
      [limit, offset]
    );

    const countResult = await pool.query(queries.countCustomers);
    const total = Number(countResult.rows[0].total);

    return {
      data: customersResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(`Error al mostrar los clientes: ${error.message}`);
  }
};

/**
 * PRODUCTS PAGINADOS
 */
const getProductsPaginated = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const productsResult = await pool.query(
      queries.getProductsPaginated,
      [limit, offset]
    );

    const countResult = await pool.query(queries.countProducts);
    const total = Number(countResult.rows[0].total);

    return {
      data: productsResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(`Error al mostrar los productos: ${error.message}`);
  }
};

module.exports = {
  getSalesPaginated,
  getCustomersPaginated,
  getProductsPaginated,
};
