const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const { DEBUG, CLIENT_ENDPOINT, REST_API_VERSION_1_ENDPOINT } = require("../config");
const middlewares = require("../middlewares");
const routes = require("../routes");


module.exports = (expressApp) => {
    if (DEBUG) {
        // for printing request details in console
        expressApp.use(morgan("tiny"));
    }

    expressApp.use(cors({
        origin: CLIENT_ENDPOINT,
        optionsSuccessStatus: 200
    }))
    expressApp.use(express.json());
    expressApp.use('/uploads', express.static('public/uploads/'));
    expressApp.use('/admin-assets', express.static('public/admin-assets'));

    // set middlewares
    middlewares.map(({ path, mid }) =>
        expressApp.use(`${REST_API_VERSION_1_ENDPOINT}${path}`, mid));
    // set routes
    routes.map(({ path, route }) =>
        expressApp.use(`${REST_API_VERSION_1_ENDPOINT}${path}`, route));
}