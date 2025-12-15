import api from "./api";

/*
  ENDPOINTS ESPERADOS (RRHH)

  GET    http://localhost:3000/api/hr/employees          (ALL)
  GET    http://localhost:3000/api/hr/employees/:id      (BY ID)
  POST   http://localhost:3000/api/hr/employees          (CREATE)
  PUT    http://localhost:3000/api/hr/employees/:id      (EDIT)
  DELETE http://localhost:3000/api/hr/employees/:id      (DELETE)
*/

//GET ALL EMPLOYEES
export const getAllEmployees = async () => {
  try {
    const response = await api.get("hr/employees");
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error fetching employees" };
  }
};

//GET EMPLOYEE BY ID
export const getEmployeeById = async (employee_id) => {
  try {
    const response = await api.get(`hr/employees/${employee_id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error fetching employee by ID" };
  }
};

/* =====================
   GET EMPLOYEE BY NAME
===================== */
export const getEmployeeByName = async (first_name) => {
  try {
    const response = await api.get(`hr/employees/name/${first_name}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error fetching employee by name" };
  }
};

// CREATE EMPLOYEE

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post("hr/employees", employeeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error creating employee" };
  }
};

//UPDATE EMPLOYEE

export const updateEmployeeById = async (employee_id, employeeData) => {
  try {
    const response = await api.put(
      `hr/employees/${employee_id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error updating employee" };
  }
};

//DELETE EMPLOYEE
export const deleteEmployeeById = async (employee_id) => {
  try {
    const response = await api.delete(`hr/employees/${employee_id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Error deleting employee" };
  }
};