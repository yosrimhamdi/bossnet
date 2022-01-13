const customPageService = require("../services/customPageService");
const responseErrorsMsgs = require("../config/responseErrorsMsgs");

/*
   prams: [customPageId]
*/
const getCustomPageById = async (req, res) => {
  const page = await customPageService.getCustomPageById(
    req.params.customPageId
  );
  if (page) {
    res.send({
      page,
    });
    return;
  }
  res.status(404).send({
    error: responseErrorsMsgs.NOT_FOUND_MSG,
  });
};

module.exports = {
  getCustomPageById,
};
