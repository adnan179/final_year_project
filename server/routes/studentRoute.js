const express = require("express");
const router = express.Router();
const { Student, Project } = require("../models/mainSchema");

router.get("/:studentRollnumber", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.params.studentRollnumber,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:userEmail/project", async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.params.userEmail,
    });

    const project = await Project.findOne({
      projectNumber: student.projectNumber,
    });
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
