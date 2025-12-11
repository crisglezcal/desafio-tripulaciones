/* Crear tabla de usuarios */

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(24) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    is_logged BOOLEAN DEFAULT FALSE
);

/* Crear tabla de tattoos */

CREATE TABLE tattoos (
    id_tattoo SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

/* Crear tabla de reservas*/

CREATE TABLE booking (
    id_booking SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_tattoo INT NOT NULL,
    date_booking DATE NOT NULL,
    hour_booking TIME NOT NULL,

    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_tattoo) REFERENCES tattoos(id_tattoo)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* Insertar usuarios de ejemplo*/
INSERT INTO users (name, email, password, role, is_logged)
VALUES 
('Ana Torres', 'ana@example.com', 'hashedpass1', 'admin', FALSE),
('Luis Romero', 'luis@example.com', 'hashedpass2', 'client', FALSE),
('Marta Pérez', 'marta@example.com', 'hashedpass3', 'client', TRUE);

/* Insertar tatuajes de ejemplo*/
INSERT INTO tattoos (name, description, image)
VALUES
('Dragon Tribal', 'Tatuaje grande estilo tribal', 'dragon.png'),
('Flor Minimalista', 'Flor pequeña en línea fina', 'flower.png'),
('Geometría Sagrada', 'Diseño geométrico simétrico', 'geo.png');

/* Insertar reservas de ejemplo*/
INSERT INTO booking (id_user, id_tattoo, date_booking, hour_booking)
VALUES
(1, 2, '2025-01-15', '10:30:00'),
(2, 1, '2025-02-10', '16:00:00'),
(3, 3, '2025-03-05', '12:45:00');
