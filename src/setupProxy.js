const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (mainRouter) {
  mainRouter.use(
    createProxyMiddleware("/api", { target: "http://localhost:3001" })
  );
};
