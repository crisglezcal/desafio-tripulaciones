const queries = {
  // Obtener todas las ventas
  getSales: `
    SELECT 
      s.sale_id,
      s.employee_id,
      CONCAT(e.first_name, ' ', e.last_name) as employee_name,
      s.customer_id,
      CONCAT(c.first_name, ' ', c.last_name) as customer_name,
      s.product_id,
      p.product_name,
      s.sales_channel,
      s.quantity,
      s.discount_percentage,
      s.payment_method,
      s.subtotal,
      s.discount_amount,
      s.total,
      s.hour,
      s.day,
      s.month,
      s.year
    FROM sales s
    LEFT JOIN employees e ON s.employee_id = e.employee_id
    LEFT JOIN customers c ON s.customer_id = c.customer_id
    LEFT JOIN products p ON s.product_id = p.product_id
    ORDER BY s.year DESC, s.month DESC, s.day DESC, s.hour DESC
  `,
  
  // Obtener todos los clientes
  getCustomers: `
    SELECT 
      customer_id,
      first_name_customer as first_name,
      last_name_customer as last_name,
      email_customer as email,
      region
    FROM customers
    ORDER BY last_name_customer, first_name_customer
  `,
  
  // Obtener todos los productos
  getProducts: `
    SELECT 
      product_id,
      product_name,
      category,
      unit_price
    FROM products
    ORDER BY product_name
  `,
  
  // Obtener empleados del departamento HR
  getHr: `
    SELECT 
      employee_id,
      first_name,
      last_name,
      position,
      department,
      salary
    FROM employees
    WHERE department = 'HR' OR department = 'RRHH'
    ORDER BY last_name, first_name
  `,
  
  // Obtener todos los usuarios
  getAllUsers: `
  SELECT 
    user_id,
    role,
    email
  FROM users
  ORDER BY role, user_id
`,
  
  // Obtener usuario por ID
  // getUserById: `
  //   SELECT 
  //     u.user_id,
  //     u.employee_id,
  //     CONCAT(e.first_name, ' ', e.last_name) as employee_name,
  //     u.role,
  //     u.email,
  //     u.password
  //   FROM users u
  //   LEFT JOIN employees e ON u.employee_id = e.employee_id
  //   WHERE u.user_id = $1
  // `,
  
  getUserById: `
  SELECT 
    user_id,
    role,
    email,
    password
  FROM users
  WHERE user_id = $1
`,
  // Crear nuevo usuario
  createUser: `
    INSERT INTO users (role, email, password)
    VALUES ($1, $2, $3)
    RETURNING 
      user_id,
      role,
      email
  `,
  
  // Actualizar usuario
  updateUserById: `
    UPDATE users 
    SET 
      role = $1,
      email = $2,
      password = $3
    WHERE user_id = $4
    RETURNING 
      user_id,
      role,
      email
  `,
  
  // Eliminar usuario
  deleteUserById: `
    DELETE FROM users 
    WHERE user_id = $1
    RETURNING 
      user_id,
      role,
      email
  `
};

module.exports = queries;