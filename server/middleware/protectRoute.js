const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");
require("dotenv").config();

const protectRoute = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    try {
      //verifying the token
      const decoded = jwt.verify(token, process.env.SECRET);
      //check if the user has the required role
      if (decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient privelege" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token", error });
    }
  };
};

module.exports = protectRoute;
