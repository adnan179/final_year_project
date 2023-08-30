const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorizeUser = (allowedScopes) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET);

      const userRole = decodedToken.role;
      const userScopes = decodedToken.scopes;

      // Check if the user's role is allowed
      if (userRole === "admin" || userRole === "reviewer") {
        req.userData = decodedToken;
        return next(); // Admin and reviewer have access to all routes
      }

      // Check if the user's scopes match the allowed scopes
      const intersection = userScopes.filter((scope) =>
        allowedScopes.includes(scope)
      );

      if (intersection.length === 0) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // For user role, only allow access to their own projects
      if (
        userScopes.includes("user") &&
        req.params.projectNumber &&
        req.params.projectNumber === decodedToken.projectNumber
      ) {
        req.userData = decodedToken;
        return next();
      }

      return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = authorizeUser;
