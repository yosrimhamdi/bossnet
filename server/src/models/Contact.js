const mongoose = require("mongoose");
const { CONTACT } = require("./configs/collectionsNames");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
    },
    mobilePhone: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    isContacted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Contact = mongoose.model(CONTACT, contactSchema);
module.exports = Contact;