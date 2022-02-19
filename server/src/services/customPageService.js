const CustomPage = require("../models/CustomPage");
const { NotFoundError } = require("./exceptions");

const getCustomPageById = async (id) => {
  const page = await CustomPage.findById(id);
  if (!page) {
    throw new NotFoundError();
  }
  return page;
};

const getFooterCustomPages = async () => {
  const pages = await CustomPage.find({
    showAtFooter: true,
  })
    .select(["_id", "title"])
    .limit(10);

  return pages;
};

const getAllCustomPagesForSeo = () => CustomPage.find().select("_id");

module.exports = {
  getCustomPageById,
  getFooterCustomPages,
  getAllCustomPagesForSeo,
};
