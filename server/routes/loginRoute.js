const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController");

// Route to login and generate a JWT token
router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Call the loginUser function
    const { token, role, permission } = await loginUser(userName, password);

    // Send the JWT token as response
    res.status(200).json({ token, role, permission });
  } catch (error) {
    res.status(401).json({ message: "Invalid Credentails" });
  }
});

module.exports = router;
