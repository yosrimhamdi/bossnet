const mongoose = require("mongoose");

module.exports = (clientId) => [
  {
    $lookup: {
      from: "clientpayments",
      pipeline: [
        {
          $match: {
            isPaid: true,
            $expr: {
              $eq: ["$client", new mongoose.Types.ObjectId(clientId)],
            },
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
      ],
      as: "paidAmount",
    },
  },
  {
    $project: {
      paidAmount: {
        $ifNull: [{ $arrayElemAt: ["$paidAmount.amount", 0] }, 0],
      },
    },
  },
];
