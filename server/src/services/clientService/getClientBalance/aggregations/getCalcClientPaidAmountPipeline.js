const mongoose = require("mongoose");

module.exports = (clientId) => [
  {
    $match: {
      isPaid: true,
      client: new mongoose.Types.ObjectId(clientId),
    },
  },
  {
    $group: {
      _id: null,
      amount: {
        $sum: "$amount",
      },
    },
  },
];
