const express = require("express");
const router = express.Router();
const { Student, Project } = require("../models/mainSchema");

//route to add new students
router.post("/addStudents", async (req, res) => {
  try {
    const studentData = req.body;
    const students = [];

    for (const student of studentData) {
      const {
        name,
        rollNumber,
        department,
        branch,
        phoneNumber,
        email,
        projects,
      } = student;

      if (
        !name ||
        !rollNumber ||
        !department ||
        !branch ||
        !phoneNumber ||
        !email ||
        !projects
      ) {
        return res.status(400).json({
          message: `All required fields must be provided for ${student}`,
        });
      }

      const newStudent = new Student({
        name,
        rollNumber,
        department,
        branch,
        phoneNumber,
        email,
        projects,
      });
      await newStudent.validate();
      await newStudent.save();
      students.push(newStudent);
    }
    res
      .status(201)
      .json({ message: "New students added successfully", students });
  } catch (error) {
    console.log("An Error occurred while adding students", error);
    res.status(500).json({
      error: "An Error occurred while adding students",
      error,
    });
  }
});

//route to get all students who aren't registered to a project channel yet
router.get("/getAllStudents", async (req, res) => {
  try {
    const students = await Student.find({
      $expr: { $lt: [{ $size: "$projects" }, 1] },
    });
    res.status(200).json({ students });
  } catch (error) {
    console.log("Error fetching the guides", error);
    res.status(500).json({
      message: "An Error occurred while fetching the guides",
      details: error.error,
    });
  }
});

//route to get a single student using roll number
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

//route to update review-1 data
router.post("/updateReview1", async (req, res) => {
  try {
    const review1Data = req.body;
    // Iterate through the received data and update the database accordingly
    for (const studentData of review1Data) {
      const { name, totalMarks } = studentData;
      // Find the student by name and update review1 data
      const student = await Student.findOneAndUpdate(
        { name: name },
        {
          $set: {
            "review1.totalMarks": totalMarks,
          },
        },
        { new: true }
      );
    }
    res.status(200).send("Review-1 data updated successfully");
  } catch (error) {
    console.error("Error while updating review-1 data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//route to update review-2 data
router.post("/updateReview2", async (req, res) => {
  try {
    const review2Data = req.body;
    // Iterate through the received data and update the database accordingly
    for (const studentData of review2Data) {
      const { name, totalMarks } = studentData;
      // Find the student by name and update review1 data
      const student = await Student.findOneAndUpdate(
        { name: name },
        {
          $set: {
            "review2.totalMarks": totalMarks,
          },
        },
        { new: true }
      );
    }
    res.status(200).send("Review-2 data updated successfully");
  } catch (error) {
    console.error("Error while updating review-2 data:", error);
    res.status(500).send("Internal Server Error");
  }
});
//route to update review-3 data
router.post("/updateReview3", async (req, res) => {
  try {
    const review3Data = req.body;
    // Iterate through the received data and update the database accordingly
    for (const studentData of review3Data) {
      const { name, totalMarks } = studentData;
      // Find the student by name and update review1 data
      const student = await Student.findOneAndUpdate(
        { name: name },
        {
          $set: {
            "review3.totalMarks": totalMarks,
          },
        },
        { new: true }
      );
    }
    res.status(200).send("Review-3 data updated successfully");
  } catch (error) {
    console.error("Error while updating review-3 data:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
