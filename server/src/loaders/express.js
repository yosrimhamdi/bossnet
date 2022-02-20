const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  DEBUG,
  REST_API_VERSION_1_ENDPOINT,
  EXPRESS_TRUST_PROXY_NUMBER,
} = require("../config");
const corsOriginHandler = require("./../utils/corsOriginHandler");
const httpErrorsHandler = require("../middlewares/httpErrorsHandler");
const middlewares = require("../middlewares");
const routes = require("../routes");
const helmet = require("helmet");

module.exports = (expressApp) => {
  if (DEBUG) {
    // for printing request details in console
    expressApp.use(morgan("tiny"));
  }

  expressApp.use(
    cors({
      origin: corsOriginHandler,
    })
  );
  // numberOfProxies is the number of proxies between the user and the server ( to find correct client ip ).
  expressApp.set("trust proxy", EXPRESS_TRUST_PROXY_NUMBER);
  // for ip testing
  expressApp.get(`${REST_API_VERSION_1_ENDPOINT}/ip`, (req, res) =>
    res.send(req.ip)
  );
  // Helmet helps secure Express apps by setting various HTTP headers.
  expressApp.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    })
  );

  expressApp.use(express.json());
  expressApp.use("/uploads", express.static("public/uploads/"));
  expressApp.use("/admin-assets", express.static("public/admin-assets"));

  // set middlewares
  middlewares.map(({ path, mid }) =>
    expressApp.use(`${REST_API_VERSION_1_ENDPOINT}${path}`, mid)
  );
  // set routes
  routes.map(({ path, route }) =>
    expressApp.use(`${REST_API_VERSION_1_ENDPOINT}${path}`, route)
  );

  expressApp.use(httpErrorsHandler);
};
