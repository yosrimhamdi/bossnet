const mongoose = require("mongoose");

module.exports = (clientId) => [
  // find client
  {
    $match: { _id: new mongoose.Types.ObjectId(clientId) },
  },
  // remove unused fields
  {
    $project: {
      _id: "$_id",
    },
  },
  // find leftChild and rightChild
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
  // count left / right children
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
    $unset: ["leftChild", "rightChild"],
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
