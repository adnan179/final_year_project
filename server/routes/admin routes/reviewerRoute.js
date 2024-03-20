const express = require("express");
const router = express.Router();
const Reviewer = require("../../models/reviewerSchema");
const User = require("../../models/userSchema");
const { Project } = require("../../models/mainSchema");

//route to register many reviewers at once
router.post("/registerMany", async (req, res) => {
  try {
    const reviewersData = req.body;

    // Check if the data is an array
    if (!Array.isArray(reviewersData)) {
      return res.status(400).json({
        message: "Invalid data format. Expecting an array of reviewer data.",
      });
    }

    // Iterate through the array and validate each reviewer data
    for (const reviewerData of reviewersData) {
      const {
        email,
        name,
        employeeId,
        phoneNumber,
        cabinNumber,
        domains,
        designation,
        projects,
      } = reviewerData;

      // Check if all required fields are present for each reviewer
      if (
        !email ||
        !name ||
        !employeeId ||
        !phoneNumber ||
        !cabinNumber ||
        !designation ||
        !domains
      ) {
        return res.status(400).json({
          message: `All required fields must be provided for ${reviewerData}`,
        });
      }

      function generateRandomPassword(length) {
        const charset =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";

        let password = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset.charAt(randomIndex);
        }

        return password;
      }

      // Generate a random password for each reviewer
      const generatedPassword = generateRandomPassword(10);
      const role = "reviewer";

      // Create a new reviewer instance for each reviewer
      const newReviewer = new Reviewer({
        email,
        name,
        employeeId,
        phoneNumber,
        cabinNumber,
        domains,
        projects,
        designation,
      });

      const reviewerRegister = new User({
        email: email,
        password: generatedPassword,
        role: role,
      });

      // Save each new reviewer to the database
      await newReviewer.save();
      await reviewerRegister.save();
    }

    res.status(201).json({ message: "Reviewers saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to get all reviewers
router.get("/getAllReviewers", async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.status(201).json({ reviewers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all reviewers who have less than two projects
router.get("/getReviewers/:domain", async (req, res) => {
  try {
    const domain = req.params.domain; // Retrieve the domain from the request parameters
    const regex = new RegExp(domain, "i"); // Case-insensitive regex for the domain
    const reviewers = await Reviewer.find({
      $or: [
        { projects: { $exists: false } },
        { projects: { $size: 0 } },
        { projects: { $size: 1 } },
      ],
      domains: { $elemMatch: { $regex: regex } }, // Match domains case-insensitively
    });
    res.status(200).json({ reviewers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to get reviewer using employeeId
router.get("/:reviewerEmployeeId", async (req, res) => {
  try {
    //extracting the employeeId from the params
    const employeeId = req.params.reviewerEmployeeId;

    //checking if we have a valid employeeId
    if (!employeeId) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    //finding the reviewer using the employeeId
    const reviewer = await Reviewer.findOne({ employeeId: employeeId });

    if (!reviewer) {
      return res.status(400).json({ message: "Reviewer not found" });
    }

    res.status(201).json(reviewer);
  } catch (error) {
    console.log(error);
  }
});

router.get("/email/:reviewerEmail", async (req, res) => {
  try {
    //extracting the employeeId from the params
    const email = req.params.reviewerEmail;

    //checking if we have a valid employeeId
    if (!email) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    //finding the reviewer using the employeeId
    const reviewer = await Reviewer.findOne({ email: email });

    if (!reviewer) {
      return res.status(400).json({ message: "Reviewer not found" });
    }

    res.status(201).json(reviewer);
  } catch (error) {
    console.log(error);
  }
});
// Route to delete a reviewer by employeeId
router.delete("/:reviewerEmployeeId", async (req, res) => {
  try {
    const employeeId = req.params.reviewerEmployeeId;

    // Check if the provided employeeId is valid
    if (!employeeId) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    // Attempt to find and delete the reviewer by employeeId and email
    const deletedReviewer = await Reviewer.findOneAndDelete({ employeeId });
    const user = await User.findOneAndDelete({ email: deletedReviewer.email });

    if (!deletedReviewer && !user) {
      return res.status(404).json({ message: "Reviewer not found" });
    }
    res.status(200).json({ message: "Reviewer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route to add newly assigned project number
router.post("/assign-project/:reviewerId", async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const { projectNumber } = req.body;
    const project = await Project.findOne({ projectNumber: projectNumber });
    // Find the reviewer by ID
    const reviewer = await Reviewer.findById(reviewerId);

    // Update the reviewer's projects array
    reviewer.projects.push(projectNumber);
    // Save the changes
    await reviewer.save();
    //update the project with the new reviewer
    project.reviewer = reviewer.employeeId;
    await project.save();

    res
      .status(201)
      .json({ success: true, message: "Project assigned successfully" });
  } catch (error) {
    console.error("Error assigning project:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//router to delete a project from reviewer's project array
router.patch(
  "/:reviewerEmployeeId/project/:projectNumber",
  async (req, res) => {
    try {
      const { reviewerEmployeeId, projectNumber } = req.params;

      // Check if the provided employeeId is valid
      if (!reviewerEmployeeId) {
        return res.status(400).json({ message: "Invalid employeeId" });
      }

      // Find the reviewer by employeeId
      const reviewer = await Reviewer.findOne({
        employeeId: reviewerEmployeeId,
      });

      if (!reviewer) {
        return res.status(404).json({ message: "Reviewer not found" });
      }
      const project = await Project.findOne({ projectNumber: projectNumber });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      project.reviewer.pull(reviewerEmployeeId);
      // Remove the projectId from the reviewer's projects array
      reviewer.projects = reviewer.projects.filter(
        (project) => project !== projectNumber
      );

      // Save the updated reviewer data
      await reviewer.save();
      await project.save();

      res.status(200).json({
        message: "Project deleted successfully from reviewer",
        reviewer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//router to send all domains available from all the reviewer's data
router.get("/project/domains", async (req, res) => {
  try {
    // Retrieve reviewers from the database
    const reviewers = await Reviewer.find();

    // Initialize an array to store all unique domains
    let allDomains = [];

    // Loop through each reviewer
    reviewers.forEach((reviewer) => {
      // Loop through each domain of the reviewer
      reviewer.domains.forEach((domain) => {
        // Add domain to allDomains array if it's not already present
        if (!allDomains.includes(domain)) {
          allDomains.push(domain);
        }
      });
    });

    // Send the response with the unique domains
    res.status(200).json(allDomains);
  } catch (error) {
    // Handle any errors that occur during the process
    console.log("Error fetching domains from reviewers", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
