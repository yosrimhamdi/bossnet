const mongoose = require("mongoose");
const PAGINATION_LIMIT = 8;

module.exports = (clientId, page = 1) => [
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
      "cinId",
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
  // Work with pagination
  {
    $facet: {
      pagination: [
        {
          $count: "total",
        },
      ],
      docs: [
        // Paginate data
        {
          $skip: (page - 1) * PAGINATION_LIMIT,
        },
        {
          $limit: PAGINATION_LIMIT,
        },
        //find leftChild and rightChild for each one
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
      ],
    },
  },
  {
    $set: {
      totalDocs: {
        $arrayElemAt: ["$pagination.total", 0],
      },
      page,
      totalPages: {
        $ceil: {
          $divide: [
            {
              $arrayElemAt: ["$pagination.total", 0],
            },
            PAGINATION_LIMIT,
          ],
        },
      },
    },
  },
  {
    $unset: ["pagination"],
  },
];
