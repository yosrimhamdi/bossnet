const PartnerOffer = require("../models/PartnerOffer");

const getHomePageOffers = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const offers = await PartnerOffer.find({
        showAtHome: true,
        $or: [
            { "duration.endDate": null },
            {
                "duration.endDate": {
                    $gte: currentDate
                }
            }
        ],
        "duration.startDate": {
            $lte: currentDate
        },
    }).select(["-relatedOffers", "-duration"]);

    return offers;
}

module.exports = {
    getHomePageOffers
}