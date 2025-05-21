const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UNAUTHORIZED_ERROR_CODE = require("../utils/errors");

const auth = (req, res, next) => {
  // Get authorization header
  const {authorization} = req.headers;

  // Check if header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: "Authorization required" });
  }

  // Get the token (remove 'Bearer ' from the header)
  const token = authorization.replace("Bearer ", "");

  // Verify the token
  try {
    // jwt.verify will decode the token using your secret
    const payload = jwt.verify(token, JWT_SECRET);

    // Add the payload to the request object
    req.user = payload;

    // Continue to the next middleware/controller
    return next();
  } catch (err) {
    // If verification fails
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: "Invalid token" });
  }
};
module.exports = auth;
