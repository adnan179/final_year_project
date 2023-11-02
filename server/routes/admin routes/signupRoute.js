const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");

// Route to register a new user
router.post("/", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //create a new user object
    const newUser = new User({
      email: email,
      password: password,
      role: role,
    });

    //save the user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
