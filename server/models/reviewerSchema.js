const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  // Login details
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Role of the user (admin, user, reviewer, etc.)
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "reviewer"],
  },

  // Permissions
  permissions: {
    createProjects: {
      type: Boolean,
      default: false,
    },
    viewProjects: {
      type: Boolean,
      default: true,
    },
  },

  // Other reviewer details
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cabinNumber: {
    type: String,
    required: true,
  },
  projectsHandling: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reviewer", reviewerSchema);
