const jwt = require("jsonwebtoken");

exports.createJWT = (data, duration) => {
  const payload = {
    data,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
