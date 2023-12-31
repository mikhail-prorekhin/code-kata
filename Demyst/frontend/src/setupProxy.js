const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/balance",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/application",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/login",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/logout",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/refresh",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/oauth/github",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    "/api/register",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
