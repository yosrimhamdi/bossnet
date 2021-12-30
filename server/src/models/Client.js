const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const Joi = require("joi");
const {
  REQUIRED_ERROR_MSG,
  INVALID_ERROR_MSG,
  UNIQUE_ERROR_MSG,
  PARENT_CHILD_DIRECTION_ALREADY_EXISTS,
} = require("./configs/fieldsValidationMessages");
const profile = require("./embeded/profile");
const { CLIENT } = require("./configs/collectionsNames");
const { CLIENT_CHILD_DIRECTION_CHOICES } = require("./configs/enums");
const ClientPayment = require("./ClientPayment");
const ClientEmailVerification = require("./ClientEmailVerification");
const ClientPasswordReset = require("./ClientPasswordReset");

const clientSchema = new mongoose.Schema(
  {
    profile: {
      type: profile,
      required: [true, REQUIRED_ERROR_MSG],
    },
    cinId: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      trim: true,
      validate: createJoiMongooseFieldValidate(
        Joi.string()
          .length(8)
          .pattern(/^[0-9]+$/),
        INVALID_ERROR_MSG
      ),
    },
    rib: {
      type: String,
      // required: [true, REQUIRED_ERROR_MSG],
      trim: true,
      validate: createJoiMongooseFieldValidate(
        Joi.string().min(20).max(30).allow(""),
        INVALID_ERROR_MSG
      ),
    },
    email: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      unique: true,
      trim: true,
      validate: createJoiMongooseFieldValidate(
        Joi.string().email({ tlds: { allow: false } }),
        INVALID_ERROR_MSG
      ),
    },
    encryptedPassword: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    // Binary Tree Structures with an Array of Ancestors
    // first Parent is a static parent (it doesn't exists in db)
    parent: {
      type: mongoose.Types.ObjectId,
      ref: CLIENT,
      default: null,
    },
    ancestors: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: CLIENT,
        },
      ],
    },
    direction: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      enum: CLIENT_CHILD_DIRECTION_CHOICES.map((direction) => direction.value),
    },
  },
  { timestamps: true }
);

const getAncestorsByParent = async (parentId) => {
  const parent = await Client.findById(parentId).select("ancestors");
  let parentAncestors;
  if (parent) {
    parentAncestors = parent.ancestors;
  }
  return [...parentAncestors, parentId];
};

const parentIsRequired = async (doc) => {
  if (!doc.parent) {
    const childrenWithParentCount = await Client.find({
      $not: { parent: null },
    }).count();
    return childrenWithParentCount >= 2; // first two children has a static parent (bossnet)
  }
};

const prentChildAlreadyExists = async (doc) => {
  return !!(await Client.findOne({
    parent: doc.parent,
    direction: doc.direction,
  }));
};

// Custom validations
clientSchema.pre("validate", async function () {
  if (await parentIsRequired(this)) {
    this.invalidate("parent", REQUIRED_ERROR_MSG);
  }
  if (await prentChildAlreadyExists(this)) {
    this.invalidate("direction", PARENT_CHILD_DIRECTION_ALREADY_EXISTS);
  }
});

clientSchema.pre("save", async function () {
  if (this.parent && this.ancestors.length == 0)
    this.ancestors = await getAncestorsByParent(this.parent);
});

// clientSchema.pre("findOneAndUpdate", async function () {
//     const docToUpdate = await Client.findOne(this.getFilter());
//     const updateSet = this._update.$set;
//     // parent changed
//     if (docToUpdate.parent.toString() != updateSet.parent) {
//         // set new ancestors
//         updateSet.ancestors = await getAncestorsByParent(updateSet.parent);
//         // update each child ancestors
//         // await Client.find({ ancestors: updateSet._id }).cursor().eachAsync(async (doc) => {
//         //     await doc.save(); // this will automatically call pre save in the top
//         //     console.log({ doc });
//         // });
//     }
// });

clientSchema.post("findOneAndRemove", async function (doc) {
  // remove client children
  await Client.deleteMany({ ancestors: doc._id });
  await ClientPayment.deleteMany({ client: doc._id });
  await ClientEmailVerification.deleteMany({ client: doc._id });
  await ClientPasswordReset.deleteMany({ client: doc._id });
});

const Client = mongoose.model(CLIENT, clientSchema);

module.exports = Client;
