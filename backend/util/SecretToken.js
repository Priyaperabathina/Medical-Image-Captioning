require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY||"jwttokenkey", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
