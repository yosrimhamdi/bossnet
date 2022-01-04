const Client = require("../models/Client");
const jwtAuth = require("../utils/jwtAuth");

// provide authentication and client data if is isAuthenticated to request
module.exports = async (req, res, next) => {
  req.isAuthenticated = false;
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer ")) {
    try {
      const client = await Client.findById(
        jwtAuth.getClientIdFromJwt(authToken)
      )
        .select([
          "-encryptedPassword",
          "-__v",
          "-ancestors",
          "-isVerified",
          "-isPaid",
        ])
        .populate({
          path: "parent",
          select: ["profile", "_id"],
        });
      if (client) {
        req.client = client;
        req.isAuthenticated = true;
      }
    } catch {
      // skiped errors like (JwtExpired, ...)
    }
  }
  next();
};
