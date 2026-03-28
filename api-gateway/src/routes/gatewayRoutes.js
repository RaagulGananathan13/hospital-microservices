const { createProxyMiddleware } = require('http-proxy-middleware');

const createServiceProxy = (target, servicePrefix) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${servicePrefix}`]: '' },
    onProxyRes: (proxyRes) => {
      const location = proxyRes.headers.location;
      // Keep Swagger redirects under the gateway service prefix without duplicating it.
      if (location && location.startsWith('/api-docs') && !location.startsWith(`${servicePrefix}/api-docs`)) {
        proxyRes.headers.location = `${servicePrefix}${location}`;
      }
    }
  });

const setupGatewayRoutes = (app) => {
  // Redirect only the exact no-slash Swagger paths to their trailing-slash forms.
  app.get(/^\/patient-service\/api-docs$/, (req, res) => res.redirect(301, '/patient-service/api-docs/'));
  app.get(/^\/doctor-service\/api-docs$/, (req, res) => res.redirect(301, '/doctor-service/api-docs/'));
  app.get(/^\/appointment-service\/api-docs$/, (req, res) => res.redirect(301, '/appointment-service/api-docs/'));
  app.get(/^\/billing-service\/api-docs$/, (req, res) => res.redirect(301, '/billing-service/api-docs/'));

  app.use('/api/patients', createProxyMiddleware({
    target: process.env.PATIENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/patients${path}`
  }));

  app.use('/api/doctors', createProxyMiddleware({
    target: process.env.DOCTOR_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/doctors${path}`
  }));

  app.use('/api/appointments', createProxyMiddleware({
    target: process.env.APPOINTMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/appointments${path}`
  }));

  app.use('/api/bills', createProxyMiddleware({
    target: process.env.BILLING_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/bills${path}`
  }));

  app.use('/patient-service', createServiceProxy(process.env.PATIENT_SERVICE_URL, '/patient-service'));

  app.use('/doctor-service', createServiceProxy(process.env.DOCTOR_SERVICE_URL, '/doctor-service'));

  app.use('/appointment-service', createServiceProxy(process.env.APPOINTMENT_SERVICE_URL, '/appointment-service'));

  app.use('/billing-service', createServiceProxy(process.env.BILLING_SERVICE_URL, '/billing-service'));
};

module.exports = setupGatewayRoutes;