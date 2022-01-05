// const Client = require("../../../models/Client");
const mongoose = require("mongoose");
const TreeChildsLimit = 8;

module.exports = (clientId) => [
  // find client and his children
  {
    $match: {
      $or: [
        { _id: new mongoose.Types.ObjectId(clientId) },
        { ancestors: new mongoose.Types.ObjectId(clientId) },
      ],
    },
  },
  // remove unused fields
  {
    $unset: [
      "cindId",
      "rib",
      "encryptedPassword",
      "isVerified",
      "isPaid",
      "updatedAt",
    ],
  },
  // sort children by ancestorsSize
  // to make the left childs parallel to right childs
  {
    $addFields: {
      ancestorsSize: {
        $size: "$ancestors",
      },
    },
  },
  {
    $sort: {
      ancestorsSize: 1,
    },
  },
  // Limit children (pagination)
  {
    $limit: TreeChildsLimit,
  },
  // find leftChild and rightChild for each one
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
  // count left / right children for each one
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
  // format result
  {
    $unset: ["leftChild", "rightChild", "ancestors"],
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
];
