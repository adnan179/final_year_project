const express = require("express");
const router = express.Router();
const Project = require("../models/mainSchema");

router.get("/:guideName", async (req, res) => {
  try {
    const projects = await Project.find({
      "guide.name": req.params.guideName,
    }).populate("guide.projects.project");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
