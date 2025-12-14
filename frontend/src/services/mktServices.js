import api from './api';

// GET http://localhost:3000/api/mkt/sales?page=1&limit=10
export const getSalesPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `mkt/sales?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Error fetching sales' };
  }
};


// GET http://localhost:3000/api/mkt/customers?page=1&limit=10
export const getCustomersPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `mkt/customers?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Error fetching customers' };
  }
};

// GET http://localhost:3000/api/mkt/products?page=1&limit=10
export const getProductsPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `mkt/products?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Error fetching products' };
  }
};

