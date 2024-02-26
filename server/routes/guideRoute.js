const express = require("express");
const router = express.Router();
const { Guide } = require("../models/mainSchema");

//route for adding multiple guides to the database
router.post("/addGuides", async (req, res) => {
  try {
    const guideData = req.body;
    const guides = [];

    for (const guide of guideData) {
      const {
        name,
        phoneNumber,
        email,
        employeeId,
        designation,
        officeRoomNumber,
        projects,
      } = guide;

      if (
        !name ||
        !phoneNumber ||
        !email ||
        !employeeId ||
        !designation ||
        !officeRoomNumber ||
        !projects
      ) {
        return res.status(400).json({
          message: `All required fields must be provided for ${guide}`,
        });
      }
      const newGuide = new Guide({
        name,
        email,
        employeeId,
        designation,
        officeRoomNumber,
        phoneNumber,
        projects,
      });
      await newGuide.validate();
      await newGuide.save();

      guides.push(newGuide);
    }
    res.status(201).json({ message: "guides added Successfully", guides });
  } catch (error) {
    console.log("Error Adding guides", error);
    res.status(500).json({
      error: "An Error occurred while adding guides",
      details: error.error,
    });
  }
});

//route to get all guides
router.get("/getAllGuides", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json({ guides });
  } catch (error) {
    console.log("Error fetching the guides", error);
    res.status(500).json({
      message: "An Error occurred while fetching the guides",
      details: error.error,
    });
  }
});

//route to get all guides who have less than 1 projects
router.get("/getGuides", async (req, res) => {
  try {
    const guides = await Guide.find({
      $expr: { $lt: [{ $size: "$projects" }, 1] },
    });
    res.status(200).json({ guides });
  } catch (error) {
    console.log("Error fetching the guides", error);
    res.status(500).json({
      message: "An Error occurred while fetching the guides",
      details: error.error,
    });
  }
});

//router to get a particular guide using the employeeID
router.get("/:guideEmployeeId", async (req, res) => {
  try {
    const guide = await Guide.findOne({
      employeeId: req.params.guideEmployeeId,
    });
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
