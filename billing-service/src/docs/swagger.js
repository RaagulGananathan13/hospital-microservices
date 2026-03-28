
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bill Service API',
      version: '1.0.0',
      description: 'Bill microservice documentation for Hospital Management System'
    },
    servers: [
      { url: 'http://localhost:5004', description: 'Bill service direct URL' }
    ]
  },
  apis: ['./src/routes/billRoutes.js']
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
