const jwt = require("jsonwebtoken");
const envConfig = require("../utils/envConfig");

// Middleware to authenticate user and attach user object to req.user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized. No token found", success: false });

  // Verify the token
  jwt.verify(token, envConfig.secretKey, (err, decoded) => {
    console.log(decoded);
    if (err)
      return res
        .status(403)
        .json({ message: "Forbidden. Invalid token", success: false });
    req.user = decoded; // Attach the decoded token payload to req.user
    next();
  });
}

//  middleware to authorize user if userId in req.user === userId in req.params
function authorizeUser(req, res, next) {
  if (req.user.userId !== req.params.id) {
    return res
      .status(403)
      .json({ message: "Forbidden. Unauthorized access", success: false });
  }
  next();
}

module.exports = { authenticateUser, authorizeUser };
