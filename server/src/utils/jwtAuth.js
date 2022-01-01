const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET_CODE, JWT_EXPIRES_IN } = require("../config");

const getClientJwt = (client) =>
  sign(
    {
      clientId: client._id,
    },
    JWT_SECRET_CODE,
    { expiresIn: JWT_EXPIRES_IN }
  );

const getClientIdFromJwt = (authToken) =>
  verify(authToken.replace("Bearer ", ""), JWT_SECRET_CODE).clientId;

module.exports = {
  getClientJwt,
  getClientIdFromJwt,
};
