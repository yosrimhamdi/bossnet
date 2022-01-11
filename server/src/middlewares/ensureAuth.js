module.exports = async (req, res, next) => {
  if (req.isAuthenticated) {
    next();
    return;
  }
  res.status(403).send({
    error: "UNAUTHORIZED_AUTH_ERROR",
  });
};
