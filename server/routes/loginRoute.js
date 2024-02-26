const express = require("express");
const jwt = require("jsonwebtoken"); // Import jwt module
const router = express.Router();
const loginUser = require("../controllers/userController");
const User = require("../models/userSchema");

// Route to login and generate a JWT token
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    if (result.token) {
      const { token } = result;
      const user = await User.findOne({ email: email });

      const role = user.role;
      const projectNumber = user?.projectNumber;
      res.status(200).json({ token, role, projectNumber });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

//route to decode the jwt token
router.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("invalid token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.log("error verifying the token", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    const { email } = decoded;
    const user = await User.findOne({ email: email });

    const role = user.role;
    const projectNumber = user?.projectNumber;
    res.status(200).json({ email, role, projectNumber });
  });
});

module.exports = router;
