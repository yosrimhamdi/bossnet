const express = require("express");

module.exports = (expressApp) => {
    expressApp.use('/uploads', express.static('public/uploads/'));
    expressApp.use('/admin-assets', express.static('public/admin-assets'));
}