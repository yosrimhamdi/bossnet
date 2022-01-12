const mongoose = require("mongoose");

const CHILDS_COUNT_AT_10_HEIGHT_EQUAL_TO = 1024; // 2**10

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
  // count children at 10 height
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
            sizeOfAncestorsMinusParentSize: 10,
            isVerified: true,
            $expr: {
              $in: ["$$varId", "$ancestors"],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "childsCountAt10Height",
    },
  },
  // format result
  {
    $set: {
      childsCountAt10Height: {
        $ifNull: [
          {
            $arrayElemAt: ["$childsCountAt10Height.count", 0],
          },
          0,
        ],
      },
    },
  },
  {
    $project: {
      clientHasReached10Height: {
        $eq: ["$childsCountAt10Height", CHILDS_COUNT_AT_10_HEIGHT_EQUAL_TO],
      },
    },
  },
];
