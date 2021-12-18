const Joi = require("joi");
const mongoose = require("mongoose");
const { PARTNER, PARTNER_OFFER } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const duration = require("./embeded/duration");
const file = require("./embeded/file");

const partnerOfferSchema = new mongoose.Schema({
    partner: {
        type: mongoose.Types.ObjectId,
        ref: PARTNER,
        required: [true, REQUIRED_ERROR_MSG],
    },
    title: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    description: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    image: {
        type: file
    },
    duration: {
        type: duration,
        required: [true, REQUIRED_ERROR_MSG]
    },
    showAtHome: {
        type: Boolean,
        default: false
    },
    relatedOffers: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: PARTNER_OFFER,
            required: [true, REQUIRED_ERROR_MSG],
        }],
    }
}, { timestamps: true });

const PartnerOffer = mongoose.model(PARTNER_OFFER, partnerOfferSchema);

module.exports = PartnerOffer;