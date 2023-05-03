const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (mainRouter) {
  mainRouter.use(
    createProxyMiddleware("/api", { target: "https://books4all-back-production-bd65.up.railway.app/" })
  );
};
