const Advertissment = require("../models/Advertissment");

const getHomePageAdvertissments = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const homeAdvertissments = await Advertissment.find({
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
    }).select(["-duration"]);
    return homeAdvertissments;
}


module.exports = {
    getHomePageAdvertissments
}