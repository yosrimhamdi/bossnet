const mongoose = require("mongoose");

module.exports = (clientId) => [
  {
    $match: {
      _id: new mongoose.Types.ObjectId(clientId),
    },
  },
  // Find left child to separate leftCounts and rightCounts
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
  // Format result
  {
    $project: {
      leftChildId: {
        $arrayElemAt: ["$leftChild._id", 0],
      },
    },
  },
  // Get left right childs counts grouped by tree height (ancestorsSize)
  {
    $lookup: {
      from: "clients",
      let: {
        varParentId: "$_id",
        varLeftChildId: "$leftChildId",
      },
      pipeline: [
        {
          $match: {
            isVerified: true,
            $expr: {
              $in: ["$$varParentId", "$ancestors"],
            },
          },
        },
        {
          $project: {
            isLeft: {
              $cond: [
                {
                  $or: [
                    {
                      $in: ["$$varLeftChildId", "$ancestors"],
                    },
                    {
                      $eq: ["$_id", "$$varLeftChildId"],
                    },
                  ],
                },
                true,
                false,
              ],
            },
            ancestorsSize: {
              $size: "$ancestors",
            },
          },
        },
        {
          $group: {
            _id: "$ancestorsSize",
            left: {
              $sum: {
                $cond: ["$isLeft", 1, 0],
              },
            },
            right: {
              $sum: {
                $cond: ["$isLeft", 0, 1],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ],
      as: "leftRightChildsCountGroupedByTreeHeight",
    },
  },
];
