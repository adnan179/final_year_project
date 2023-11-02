const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/userController");

// Route to login and generate a JWT token
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the loginUser function
    const result = await loginUser(email, password);

    if (result.token) {
      res.status(200).json({ token: result.token, role: result.role });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

module.exports = router;
