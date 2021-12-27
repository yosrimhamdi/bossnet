const { DEBUG } = require("../config");
const slowRequestMiddleware = require("./slowRequestMiddleware");

// [{path, mid}]
const middlewares = [];

if (DEBUG) {
  middlewares.push({
    path: "*",
    mid: slowRequestMiddleware,
  });
}
module.exports = middlewares;
