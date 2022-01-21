const express = require("express");
require("express-async-errors");
const loadMongoose = require("./loaders/mongoose");
const loadExpress = require("./loaders/express");
const loadAdminBro = require("./loaders/admin-bro");
const { PORT } = require("./config");
const handleAppListenCallback = require("./utils/handleAppListenCallback");
const createClientsForTesting = require("./utils/createClientsForTesting");

async function startServer() {
  const app = express();
  await loadMongoose();

  //   await createClientsForTesting();

  loadExpress(app);
  await loadAdminBro(app);
  app.listen(PORT, handleAppListenCallback);
}

startServer();
