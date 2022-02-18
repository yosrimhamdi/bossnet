// Make requests slower for better testing in front-end
// used for dev mode only
module.exports = async (req, res, next) => {
  setTimeout(() => next(), 300);
};
