/*CREACIÓN TABLAS*/
/*Employees*/
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(100),
    department VARCHAR(100),
    salary NUMERIC(10,2)
);

/*Users*/
CREATE TABLE users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
);

/*Customers*/
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name_customer VARCHAR(100) NOT NULL,
    last_name_customer VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(100)
);
/*Products*/
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    unit_price NUMERIC(10,2) NOT NULL
);

/*Sales*/
CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    sales_channel VARCHAR(100),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    discount_percentage NUMERIC(5,2),
    payment_method VARCHAR(50),
    subtotal NUMERIC(10,2),
    discount_amount NUMERIC(10,2),
    total NUMERIC(10,2),
    sale_timestamp TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);



/*INSERT INTO*/
