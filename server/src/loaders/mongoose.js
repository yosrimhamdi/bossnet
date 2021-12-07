const mongoose = require("mongoose");
const consola = require('consola');
const { MONGO_URI } = require("../config");

module.exports = async() => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
            // autoIndex: false,
            // maxPoolSize: 10,
            // serverSelectionTimeoutMS: 5000,
            // socketTimeoutMS: 45000,
        });
        consola.success("mongoose connected");
        return db;
    } catch (err) {
        consola.error("mongoose connect error");
        console.log(err);
    }
};