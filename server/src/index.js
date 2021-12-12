const express = require("express");
const loadMongoose = require("./loaders/mongoose");
const loadExpress = require("./loaders/express");
const loadAdminBro = require("./loaders/admin-bro");
const { PORT } = require("./config");
const handleAppListenCallback = require("./utils/handleAppListenCallback");

async function startServer() {
    const app = express();
    const db = await loadMongoose();
    loadExpress(app);
    await loadAdminBro(app, db);
    app.listen(PORT, handleAppListenCallback);
}

startServer();