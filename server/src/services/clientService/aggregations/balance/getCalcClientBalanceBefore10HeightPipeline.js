const mongoose = require("mongoose");
const { AMOUNT_TO_PAY_BY_CHILD } = require("./configs");

module.exports = (clientId) => [
  {
    $match: {
      _id: new mongoose.Types.ObjectId(clientId),
    },
  },
  // remove unused fields
  {
    $project: {
      _id: "$_id",
      ancestorsSize: { $size: "$ancestors" },
    },
  },
  // find leftChild and rightChild to count children
  {
    $lookup: {
      from: "clients",
      let: {
        varId: "$_id",
      },
      pipeline: [
        {
          $match: {
            isVerified: true,
            direction: "l",
            $expr: {
              $eq: ["$parent", "$$varId"],
            },
          },
        },
      ],
      as: "leftChild",
    },
  },
  {
    $lookup: {
      from: "clients",
      let: {
        varId: "$_id",
      },
      pipeline: [
        {
          $match: {
            isVerified: true,
            direction: "r",
            $expr: {
              $eq: ["$parent", "$$varId"],
            },
          },
        },
      ],
      as: "rightChild",
    },
  },
  // count left / right verified children before 10 height for each one
  {
    $lookup: {
      from: "clients",
      let: {
        varLeftChildId: {
          $arrayElemAt: ["$leftChild._id", 0],
        },
        varParentAncestorsSize: "$ancestorsSize",
      },
      pipeline: [
        {
          $set: {
            sizeOfAncestorsMinusParentSize: {
              $subtract: [
                {
                  $size: "$ancestors",
                },
                "$$varParentAncestorsSize",
              ],
            },
          },
        },
        {
          $match: {
            isVerified: true,
            sizeOfAncestorsMinusParentSize: {
              $lte: 10,
            },
            $expr: {
              $or: [
                {
                  $in: ["$$varLeftChildId", "$ancestors"],
                },
                {
                  $eq: ["$_id", "$$varLeftChildId"],
                },
              ],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "leftChildsCount",
    },
  },
  {
    $lookup: {
      from: "clients",
      let: {
        varRightChildId: {
          $arrayElemAt: ["$rightChild._id", 0],
        },
        varParentAncestorsSize: "$ancestorsSize",
      },
      pipeline: [
        {
          $set: {
            sizeOfAncestorsMinusParentSize: {
              $subtract: [
                {
                  $size: "$ancestors",
                },
                "$$varParentAncestorsSize",
              ],
            },
          },
        },
        {
          $match: {
            isVerified: true,
            sizeOfAncestorsMinusParentSize: {
              $lte: 10,
            },
            $expr: {
              $or: [
                {
                  $in: ["$$varRightChildId", "$ancestors"],
                },
                {
                  $eq: ["$_id", "$$varRightChildId"],
                },
              ],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "rightChildsCount",
    },
  },
  {
    $set: {
      leftChildsCount: {
        $ifNull: [
          {
            $arrayElemAt: ["$leftChildsCount.count", 0],
          },
          0,
        ],
      },
      rightChildsCount: {
        $ifNull: [
          {
            $arrayElemAt: ["$rightChildsCount.count", 0],
          },
          0,
        ],
      },
    },
  },
  // calc total amount
  {
    $project: {
      totalAmount: {
        $multiply: [
          { $min: ["$leftChildsCount", "$rightChildsCount"] },
          AMOUNT_TO_PAY_BY_CHILD * 2,
        ],
      },
    },
  },
];
