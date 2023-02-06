const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  DEBUG,
  REST_API_VERSION_1_ENDPOINT,
  CLIENT_ENDPOINTS,
} = require("../config");
const httpErrorsHandler = require("../middlewares/httpErrorsHandler");
const middlewares = require("../middlewares");
const routes = require("../routes");
const helmet = require("helmet");
const requestIp = require("request-ip");
const convertDurationToSeconds = require("../utils/convertDurationToSeconds");

module.exports = (expressApp) => {
  if (DEBUG) {
    // for printing request details in console
    expressApp.use(morgan("tiny"));
  }

  expressApp.use(cors());
  // expressApp.options(cors());
  // numberOfProxies is the number of proxies between the user and the server ( to find correct client ip ).
  expressApp.use(requestIp.mw());
  // for ip testing
  expressApp.get(`${REST_API_VERSION_1_ENDPOINT}/ip`, (req, res) =>
    res.send({ id: req.ip, clientIp: req.clientIp })
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
  expressApp.use(
    "/uploads",
    express.static("public/uploads/", {
      maxAge: 1000 * convertDurationToSeconds("2day"),
    })
  );
  expressApp.use(
    "/admin-assets",
    express.static("public/admin-assets", {
      maxAge: 1000 * convertDurationToSeconds("10day"),
    })
  );
  expressApp.use(express.static("public"));

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
