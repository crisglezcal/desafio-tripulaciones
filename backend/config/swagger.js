const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//PARA VERLO EN EL NAVEGADOR: http://localhost:3000/api-docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: process.env.VITE_API_URL, // Cambia la URL según tu entorno
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos donde documentarás tus endpoints
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
