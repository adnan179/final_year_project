const express = require("express");
const router = express.Router();
const Reviewer = require("../../models/reviewerSchema");
const User = require("../../models/userSchema");

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      employeeId,
      phoneNumber,
      cabinNumber,
      designation,
      projectsHandling,
    } = req.body;

    // Check if all required fields are present
    if (
      !email ||
      !password ||
      !name ||
      !employeeId ||
      !phoneNumber ||
      !cabinNumber ||
      !designation ||
      !projectsHandling
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Define the role and permissions here
    const role = "reviewer"; // Change this to the desired role

    const newReviewer = new Reviewer({
      email,
      password,
      name,
      employeeId,
      phoneNumber,
      cabinNumber,
      projectsHandling,
      designation,
      role,
    });
    const reviewerRegister = new User({
      email: email,
      password: password,
      role: role,
    });

    // Save the new reviewer to the database
    await newReviewer.save();
    await reviewerRegister.save();

    res
      .status(201)
      .json({ newReviewer, message: "New reviewer saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.json(reviewers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:reviewerEmployeeId", async (req, res) => {
  try {
    const reviewer = await Reviewer.findOne({
      employeeId: req.params.reviewerEmployeeId,
    });
    res.json(reviewer);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
