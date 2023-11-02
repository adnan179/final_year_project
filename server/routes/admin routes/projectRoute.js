const express = require("express");
const router = express.Router();
const { Project, Guide, Student } = require("../../models/mainSchema");
const User = require("../../models/userSchema");
const protectRoute = require("../../middleware/protectRoute");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

// router.use(protectRoute("admin"));
//route to create a new project only for admin
// POST a new project
router.post("/", async (req, res) => {
  try {
    // You can access the project, guide, and students data from the request body directly
    const { projectNumber, title, description, domain, guide, team } = req.body;

    // Create guide, students, and project documents
    const newGuide = new Guide(guide);
    const newStudents = team.map((student) => new Student(student));
    const newProject = new Project({
      projectNumber,
      title,
      description,
      domain,
      guide: newGuide,
      team: newStudents,
    });
    //validating and saving the project
    await newProject.validate();
    await newProject.save();

    const guideSignup = new User({
      email: guide.email,
      password: guide.password,
      role: "user",
    });

    const studentSignup = await Promise.all(
      team.map(async (student) => {
        // Hash the password

        // Create a new user with the hashed password
        const newUser = new User({
          email: student.email,
          password: student.password,
          role: "user",
        });

        try {
          await newUser.validate();
          await newUser.save();
          return newUser; // Return the saved user
        } catch (error) {
          console.log("error saving student", error);
        }
      })
    );

    // Save the guide, students, and project
    await guideSignup.validate();
    await guideSignup.save();
    await newGuide.validate();
    await newGuide.save();
    await Student.validate();
    await Student.insertMany(newStudents);
    await studentSignup.validate();
    await studentSignup.save();

    // Send a success response
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the project data" });
  }
});

//router to get all projects from database
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//router to get a single project using project number
router.get("/by-number/:projectNumber", async (req, res) => {
  try {
    const project = await Project.findOne({
      projectNumber: req.params.projectNumber,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found!!" });
    }

    // Find the guide
    const guide = await Guide.findOne({ _id: project.guide });

    // Find the students
    const students = await Student.find({ _id: { $in: project.team } });

    res.json({ project, guide, students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//router to get all project using domain
router.get("/by-domain/:domain", async (req, res) => {
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
});

//router to get all project using guide's name
router.get("/by-guide/:guideName", async (req, res) => {
  try {
    const guideName = req.params.guideName;
    const projects = await Project.find({
      "guide.name": guideName,
    });

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects for this guide!!" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to delete project
router.delete("/:projectNumber", async (req, res) => {
  try {
    const { projectNumber } = req.params.projectNumber;
    const project = await Project.findOne({
      projectNumber: projectNumber,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const guide = await Guide.findById(project.guide);

    const studentIds = project.team.map((student) => student._id);
    const students = await Student.find({ _id: studentIds });

    const guideUser = await User.findOneAndDelete({ email: guide.email });
    await Guide.findByIdAndDelete({ _id: guideUser._id });

    await User.deleteMany({
      email: { $in: students.map((student) => student.email) },
    });

    await Student.deleteMany({ _id: { $in: studentIds } });
  } catch (error) {
    console.log(Error);
  }
});

module.exports = router;
