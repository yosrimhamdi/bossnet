const mongoose = require("mongoose");

const PAY_AMOUNT_BY_CHILD = 7.5; // 7.5 TND

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
  // count left / right verified children for each one
  {
    $lookup: {
      from: "clients",
      let: {
        leftChildId: {
          $arrayElemAt: ["$leftChild._id", 0],
        },
      },
      pipeline: [
        {
          $match: {
            isVerified: true,
            $expr: {
              $or: [
                {
                  $in: ["$$leftChildId", "$ancestors"],
                },
                {
                  $eq: ["$_id", "$$leftChildId"],
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
        rightChildId: {
          $arrayElemAt: ["$rightChild._id", 0],
        },
      },
      pipeline: [
        {
          $match: {
            isVerified: true,
            $expr: {
              $or: [
                {
                  $in: ["$$rightChildId", "$ancestors"],
                },
                {
                  $eq: ["$_id", "$$rightChildId"],
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
          PAY_AMOUNT_BY_CHILD * 2,
        ],
      },
    },
  },
  // calc paid amount
  {
    $lookup: {
      from: "clientpayments",
      let: {
        varId: "$_id",
      },
      pipeline: [
        {
          $match: {
            isPaid: true,
            $expr: {
              $eq: ["$client", "$$varId"],
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
    $set: {
      paidAmount: {
        $ifNull: [{ $arrayElemAt: ["$paidAmount.amount", 0] }, 0],
      },
    },
  },
];
