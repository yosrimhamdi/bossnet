const { PARTNER_TYPE_CHOICES } = require("../models/configs/enums");
const Partner = require("../models/Partner");

const getHomePagePartners = async () => {
    const platiniumPartners = await Partner.find({
        type: PARTNER_TYPE_CHOICES[0].value
    }).select(["_id", "logo", "name"]);

    return platiniumPartners;
}

module.exports = {
    getHomePagePartners
}