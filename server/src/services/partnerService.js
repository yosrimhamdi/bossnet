const { PARTNER_TYPE_CHOICES } = require("../models/configs/enums");
const Partner = require("../models/Partner");
const categoryService = require("./categoryService");

const PAGINATION_LIMIT = 8;

const getHomePagePartners = async () => {
  const platiniumPartners = await Partner.find({
    type: PARTNER_TYPE_CHOICES[0].value,
  }).select(["_id", "logo", "name"]);

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
      select: ["_id", "name", "logo", "description"],
    }
  );

  return paginatedPartners;
};

const getPartnersBySearchQuery = async (
  searchQuery,
  page = 1,
  select = ["_id", "name", "logo", "description"]
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
      select,
    }
  );
  return partners;
};

module.exports = {
  getHomePagePartners,
  getPartnersByCategory,
  getPartnersBySearchQuery,
};
