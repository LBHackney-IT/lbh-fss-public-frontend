const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1",
      changeOrigin: true,
    })
  );
};
