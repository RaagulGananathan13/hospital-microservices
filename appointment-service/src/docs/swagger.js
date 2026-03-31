
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const getSwaggerSpec = (req) => {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const forwardedHost = req.headers['x-forwarded-host'];
  const forwardedPrefix = req.headers['x-forwarded-prefix'];
  const directProto = req.protocol;
  const directHost = req.get('host');

  const servers = [{ url: `${directProto}://${directHost}`, description: 'Appointment service direct URL' }];

  if (forwardedHost && forwardedPrefix) {
    const proxyProto = forwardedProto || directProto;
    servers.unshift({
      url: `${proxyProto}://${forwardedHost}${forwardedPrefix}`,
      description: 'Appointment service via API gateway'
    });
  }

  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Appointment Service API',
        version: '1.0.0',
        description: 'Appointment microservice documentation for Hospital Management System'
      },
      servers
    },
    apis: ['./src/routes/appointmentRoutes.js']
  });
};

const setupSwagger = (app) => {
  app.get('/api-docs.json', (req, res) => {
    res.json(getSwaggerSpec(req));
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, false, {}, null, null, '../api-docs.json'));
};

module.exports = setupSwagger;
