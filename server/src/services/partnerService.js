const { PARTNER_TYPE_CHOICES } = require("../models/configs/enums");
const Partner = require("../models/Partner");
const categoryService = require("./categoryService");

const PAGINATION_LIMIT = 8;

const getHeaderPartners = async () => {
  const partners = await Partner.find({
    type: PARTNER_TYPE_CHOICES[0].value,
  })
    .sort("-updatedAt")
    .select(["_id", "name"])
    .limit(6);

  return partners;
};

const getHomePagePartners = async () => {
  const platiniumPartners = await Partner.find({
    type: PARTNER_TYPE_CHOICES[0].value,
  })
    .sort("-updatedAt")
    .select(["_id", "logo", "name"]);

  return platiniumPartners;
};

const getPartnersByCategory = async (categoryId, page = 1) => {
  const paginatedPartners = await Partner.paginate(
    {
      categories: categoryId,
    },
    {
      page,
      limit: PAGINATION_LIMIT,
      sort: "type -updatedAt",
      select: ["_id", "name", "logo", "description", "discountRate"],
    }
  );

  return paginatedPartners;
};

const getPartners = async (
  page,
  select = ["_id", "name", "logo", "description", "discountRate"]
) => {
  const partners = await Partner.paginate(
    {},
    {
      page,
      limit: PAGINATION_LIMIT,
      sort: "type -updatedAt",
      select,
    }
  );
  return partners;
};

const getPartnersBySearchQuery = async (
  searchQuery,
  page = 1,
  select = ["_id", "name", "logo", "description", "discountRate"]
) => {
  const categories = await categoryService.getCategoriesIdsBySearchQuery(
    searchQuery
  );
  const partners = await Partner.paginate(
    {
      $or: [
        { categories: { $in: categories } },
        { name: { $regex: new RegExp(`^${searchQuery}`, "i") } },
      ],
    },
    {
      page,
      limit: PAGINATION_LIMIT,
      sort: "type -updatedAt",
      select,
    }
  );
  return partners;
};

const getPartnerById = async (partnerId) => {
  const partner = await Partner.findById(partnerId).populate({
    path: "categories",
    select: ["_id", "name"],
  });
  return partner;
};

module.exports = {
  getHomePagePartners,
  getPartnersByCategory,
  getPartners,
  getPartnersBySearchQuery,
  getPartnerById,
  getHeaderPartners,
};
