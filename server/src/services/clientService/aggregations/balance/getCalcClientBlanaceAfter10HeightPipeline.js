const mongoose = require("mongoose");
const {
  FIXED_AMOUNT_AFTER_10_HEIGHT,
  TOTAL_AMOUNT_BEFORE_10_HEIGHT,
} = require("./configs");

module.exports = (clientId) => [
  // find client
  {
    $match: {
      _id: new mongoose.Types.ObjectId(clientId),
    },
  },
  // project only necessary fields
  {
    $project: {
      _id: "$_id",
      sizeOfAncestors: {
        $size: "$ancestors",
      },
    },
  },
  // calc total Balance After 10 height
  {
    $lookup: {
      from: "clients",
      let: {
        varId: "$_id",
        varSizeOfAncestors: "$sizeOfAncestors",
      },
      pipeline: [
        {
          $set: {
            sizeOfAncestorsMinusParentSize: {
              $subtract: [
                {
                  $size: "$ancestors",
                },
                "$$varSizeOfAncestors",
              ],
            },
          },
        },
        {
          $match: {
            isVerified: true,
            sizeOfAncestorsMinusParentSize: {
              $gt: 10,
            },
            $expr: {
              $in: ["$$varId", "$ancestors"],
            },
          },
        },
        {
          $group: {
            _id: "$sizeOfAncestorsMinusParentSize",
            childsCount: {
              $sum: 1,
            },
          },
        },
        {
          // make sure height children has pow(2, height) children (full)
          $match: {
            $expr: {
              $eq: [
                "$childsCount",
                {
                  $pow: [2, "$_id"],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            totalBalance: {
              $sum: FIXED_AMOUNT_AFTER_10_HEIGHT,
            },
          },
        },
      ],
      as: "totalBalanceAfter10",
    },
  },
  // Format fields
  {
    $set: {
      totalBalanceAfter10: {
        $ifNull: [
          { $arrayElemAt: ["$totalBalanceAfter10.totalBalance", 0] },
          0,
        ],
      },
    },
  },
  // Add before 10 amount
  {
    $project: {
      totalAmount: {
        $add: ["$totalBalanceAfter10", TOTAL_AMOUNT_BEFORE_10_HEIGHT],
      },
    },
  },
];
