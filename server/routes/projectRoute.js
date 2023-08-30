const express = require("express");
const router = express.Router();
const { Project } = require("../models/mainSchema");
const authorizeUser = require("../middleware/authUser");

//route to create a new project only for admin
router.post("/", authorizeUser("all"), async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//router to get all projects from database
router.get("/", authorizeUser("all"), async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//router to get a single project using project number
router.get(
  "/by-number/:projectNumber",
  authorizeUser(["admin", "reviewer", "user"]),
  async (req, res) => {
    try {
      const project = await Project.findOne({
        projectNumber: req.params.projectNumber,
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found!!" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
//router to get all project using domain
router.get(
  "/by-domain/:domain",
  authorizeUser(["admin", "reviewer"]),
  async (req, res) => {
    try {
      const projects = await Project.find({
        domain: req.params.domain,
      });

      if (!projects) {
        return res.status(404).json({ message: "Projects not found!!" });
      }

      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//router to get all project using guide's name
router.get(
  "/by-guide/:guideName",
  authorizeUser(["admin", "reviewer"]),
  async (req, res) => {
    try {
      const guideName = req.params.guideName;
      const projects = await Project.find({
        "guide.name": guideName,
      });

      if (projects.length === 0) {
        return res
          .status(404)
          .json({ message: "No projects for this guide!!" });
      }

      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
