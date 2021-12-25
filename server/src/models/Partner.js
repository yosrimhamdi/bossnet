const Joi = require("joi");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const { PARTNER, CATEGORY } = require("./configs/collectionsNames");
const { PARTNER_TYPE_CHOICES } = require("./configs/enums");
const {
  REQUIRED_ERROR_MSG,
  INVALID_ERROR_MSG,
} = require("./configs/fieldsValidationMessages");
const file = require("./embeded/file");
const files = require("./embeded/files");
const location = require("./embeded/location");
const PartnerOffer = require("./PartnerOffer");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      trim: true,
    },
    description: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      trim: true,
    },
    type: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
      enum: PARTNER_TYPE_CHOICES.map((item) => item.value),
    },
    email: {
      type: String,
      trim: true,
      validate: createJoiMongooseFieldValidate(
        Joi.string()
          .email({ tlds: { allow: false } })
          .allow(""),
        INVALID_ERROR_MSG
      ),
    },
    logo: {
      type: file,
    },
    images: {
      type: files,
    },
    webSiteURL: {
      type: String,
      validate: createJoiMongooseFieldValidate(
        Joi.string().uri().allow(""),
        INVALID_ERROR_MSG
      ),
    },
    location: {
      type: location,
      required: [true, REQUIRED_ERROR_MSG],
    },
    timing: {
      type: String,
      required: [true, REQUIRED_ERROR_MSG],
    },
    discountRate: {
      type: Number,
      validate: createJoiMongooseFieldValidate(
        Joi.number().min(0).max(100),
        INVALID_ERROR_MSG
      ),
    },
    categories: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: CATEGORY,
        },
      ],
      required: [true, REQUIRED_ERROR_MSG],
    },
  },
  {
    timestamps: true,
  }
);

partnerSchema.plugin(mongoosePaginate);

partnerSchema.index({ name: 1 });
partnerSchema.index({ categories: 1 });

partnerSchema.post("findOneAndRemove", async function (doc) {
  // remove partner offers
  await PartnerOffer.deleteMany({ partner: doc._id });
});

const Partner = mongoose.model(PARTNER, partnerSchema);
Partner.createIndexes(() => console.log("Partner indexes done!"));
module.exports = Partner;
