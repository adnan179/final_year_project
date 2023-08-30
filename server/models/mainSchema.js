const mongoose = require("mongoose");

//rules for student data
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//rules for guide data
const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  officeRoomNumber: {
    type: String,
    required: true,
  },
});

//rules for project data
const projectSchema = new mongoose.Schema({
  projectNumber: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  team: [studentSchema],
  guide: [guideSchema],
});

//validating project if there have at least three students per team and max 4 students per project
projectSchema.path("team").validate(function (value) {
  return value.length >= 3 && value.length <= 4;
}, "A project must have 3 to 4 team members.");

const Project = mongoose.model("Project", projectSchema);
const Guide = mongoose.model("Guide", guideSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Project,
  Guide,
  Student,
};
