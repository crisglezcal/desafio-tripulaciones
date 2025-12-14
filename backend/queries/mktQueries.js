const queries = {
  // Obtener todas las ventas
  getSalesPaginated: `
    SELECT 
      s.sale_id,
      s.employee_id,
      s.customer_id,
      c.first_name_customer,
      c.last_name_customer,
      p.product_name,
      s.sales_channel,
      s.quantity,
      s.discount_percentage,
      s.subtotal,
      s.discount_amount,
      s.total,
      s.payment_method,
      s.sale_timestamp
    FROM sales s
    LEFT JOIN customers c ON s.customer_id = c.customer_id
    LEFT JOIN products p ON s.product_id = p.product_id
    ORDER BY s.sale_timestamp DESC
    LIMIT $1 OFFSET $2
  `,
 // Obtener todas las ventas
countSales: ` 
  SELECT COUNT(*) AS total
  FROM sales
`,
  // Obtener todos los clientes
  getCustomersPaginated: `
  SELECT
    customer_id,
    first_name_customer,
    last_name_customer,
    email,
    region
  FROM customers
  ORDER BY last_name_customer, first_name_customer
  LIMIT $1 OFFSET $2
`,

countCustomers: `
  SELECT COUNT(*) AS total
  FROM customers
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
  getProductsPaginated: `
  SELECT
    product_id,
    product_name,
    category,
    unit_price
  FROM products
  ORDER BY product_name
  LIMIT $1 OFFSET $2
`,

countProducts: `
  SELECT COUNT(*) AS total
  FROM products
`,
};

module.exports = queries;