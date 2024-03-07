const express = require("express");
const router = express.Router();
const { Project, Guide, Student } = require("../../models/mainSchema");
const User = require("../../models/userSchema");
const Reviewer = require("../../models/reviewerSchema");
const mongoose = require("mongoose");
const { generateRandomPassword, logger } = require("../../utils/utils.js");
const { firestore } = require("../../config/firebase-config.js");
const { collection, doc, deleteDoc } = require("firebase/firestore");

// POST a new project
router.post("/", async (req, res) => {
  let session;
  let newProject;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const {
      projectNumber,
      title,
      description,
      domain,
      guide,
      student1,
      student2,
      student3,
      student4,
    } = req.body;

    // Validate that at least three students are present in the team
    if (!student1 || !student2 || !student3) {
      return res.status(400).json({
        message: "At least three students are required for a project team",
      });
    }

    // Fetch existing guide and students from the database
    const existingGuide = await Guide.findById(guide);

    // Prepare an array of student IDs excluding empty strings
    const studentIds = [student1, student2, student3, student4].filter(
      (id) => id
    );

    // Fetch existing students from the database
    const existingStudents = await Student.find({
      _id: { $in: studentIds },
    });

    // Extract roll numbers from existing students
    const studentRollNumbers = existingStudents.reduce(
      (rollNumbers, student) => {
        rollNumbers[student._id.toString()] = student.rollNumber;
        return rollNumbers;
      },
      {}
    );

    // Create folder in Firebase Storage
    const folderName = `${projectNumber}-${new Date().getFullYear()}`;
    // Create project document
    newProject = new Project({
      projectNumber,
      title,
      description,
      domain,
      student1: studentRollNumbers[student1.toString()],
      student2: studentRollNumbers[student2.toString()],
      student3: studentRollNumbers[student3.toString()],
      student4: student4 !== "" ? studentRollNumbers[student4.toString()] : "",
      guide: existingGuide.employeeId,
      firebaseFolder: folderName,
    });

    // Validate and save the project
    await newProject.validate();
    await newProject.save({ session });

    // Create guide user
    const guideSignup = new User({
      email: existingGuide.email,
      projectNumber,
      password: generateRandomPassword(10),
      role: "user",
    });

    // Validate and save guide user
    await guideSignup.validate();
    await guideSignup.save({ session });

    // Create user objects for students
    const studentSignups = existingStudents.map((student) => ({
      email: student.email,
      projectNumber,
      password: generateRandomPassword(10),
      role: "user",
    }));

    // Validate and save student users
    await Promise.all(
      studentSignups.map(async (student) => {
        const newUser = new User(student);
        await newUser.validate();
        await newUser.save({ session });
      })
    );

    // Update project arrays
    existingGuide.projects.push(projectNumber);
    existingStudents.forEach((student) => {
      student.projects.push(projectNumber);
    });

    // Save the updated guide and students in the same session
    await Promise.all([
      existingGuide.save({ session }),
      ...existingStudents.map((student) => student.save({ session })),
    ]);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    logger.error("Submission Error:", error);

    // Rollback the transaction if an error occurs
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    // Delete Firestore collection if created
    if (newProject && newProject.firebaseFolder) {
      try {
        await deleteDoc(doc(collection(firestore, newProject.firebaseFolder)));
      } catch (deleteError) {
        console.error("Error deleting Firestore collection:", deleteError);
      }
    }

    // Handle errors as needed
    res.status(500).json({
      message: "An error occurred while saving the project data",
      error,
    });
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

//router to get all projects which doesn't have any reviewer
router.get("/getProjects", async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ reviewer: { $exists: false } }, { reviewer: { $size: 0 } }],
    });
    if (!projects) {
      res.json({ message: "Projects not found" });
    }

    res.status(201).json({ projects });
  } catch (error) {
    console.log("Error while fetching projects witout any reviewer", error);
    res.status(500).json(error.message);
  }
});

//router to get all existing project's numbers
router.get("/projectNumbers", async (req, res) => {
  try {
    const projects = await Project.find();
    const projectNumbers = projects.map((project) => project.projectNumber);

    res.status(201).json({ projectNumbers });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const guide = await Guide.findOne({ employeeId: project.guide });

    // Find the students
    // Prepare an array of student IDs excluding empty strings
    const studentIds = [
      project.student1,
      project.student2,
      project.student3,
      project.student4,
    ].filter((id) => id);

    // Fetch the students from the database
    const students = await Student.find({
      rollNumber: { $in: studentIds },
    });

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
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { projectNumber } = req.params;
    const project = await Project.findOne({ projectNumber }).session(session);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const guide = await Guide.findOne({ employeeId: project.guide }).session(
      session
    );

    if (guide && guide.projects.includes(projectNumber)) {
      guide.projects.pull(projectNumber);
      await guide.save();
    }

    const studentRollNumbers = [
      project.student1,
      project.student2,
      project.student3,
    ];

    if (project.student4 !== "") {
      studentRollNumbers.push(project.student4);
    }

    const students = await Student.find({
      rollNumber: { $in: studentRollNumbers },
    }).session(session);

    await Promise.all(
      students.map(async (student) => {
        if (student) {
          student.projects.pull(projectNumber);
          await student.save();
        }
      })
    );
    const reviewer = await Reviewer.findOne({
      employeeId: project?.reviewer[0],
    });
    if (reviewer) {
      reviewer.projects.pull(projectNumber);
      await reviewer.save();
    }
    // Delete Firestore collection (Firebase Storage folder) if it exists
    // const firebaseFolderName = project.firebaseFolder;

    // if (firebaseFolderName) {
    //   const folderDocRef = doc(
    //     collection(firestore),
    //     firebaseFolderName.trim()
    //   );
    //   console.log(firestore);

    //   // Attempt to get the document from the collection
    //   try {
    //     const docSnapshot = await getDoc(folderDocRef);
    //     // If the document snapshot exists, delete the document
    //     if (docSnapshot.exists()) {
    //       await deleteDoc(folderDocRef);
    //       console.log(`Collection ${firebaseFolderName} deleted successfully.`);
    //     } else {
    //       console.log(`Collection ${firebaseFolderName} does not exist.`);
    //     }
    //   } catch (error) {
    //     console.error("Error checking/deleting collection:", error);
    //   }
    // }
    // Delete project document
    await Project.findOneAndDelete({ projectNumber }).session(session);

    // Delete guide user
    await User.findOneAndDelete({ email: guide.email }).session(session);

    // Delete student users
    await User.deleteMany({
      email: { $in: students.map((student) => student.email) },
    }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Successfully deleted" });
  } catch (error) {
    logger.error("Error deleting the project", error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    res.status(500).json({ message: "Internal server error" });
  }
});
//route to edit/update the review dates for the projects
router.post("/update-review-dates", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Update review dates for all projects
    await Project.updateMany({}, { reviewDate: { startDate, endDate } });

    res.status(200).send("Review dates updated successfully for all projects.");
  } catch (error) {
    console.error("Error updating review dates:", error);
    res.status(500).send("An error occurred while updating review dates.");
  }
});

//router to update the feedbacks
router.post("/:projectNumber/feedback", async (req, res) => {
  try {
    const projectNumber = req.params.projectNumber;
    const feedText = req.body.feedText;
    if (!projectNumber) {
      return res.status(400).json({ message: "projectNumber is required" });
    }
    const project = await Project.findOne({ projectNumber: projectNumber });
    if (!project) {
      return res.status(404).json({ message: "Project not found!!" });
    }
    project.Feedbacks.push(feedText);
    await project.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.log("Error updating feedback", err);
    res.status(500).message(err.message);
  }
});

module.exports = router;
