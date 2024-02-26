const mongoose = require("mongoose");

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
  projects: {
    type: Array,
    validate: {
      validator: function (array) {
        return array.length <= 1;
      },
      message: "Projects array must have at most 1 elements.",
    },
  },
});

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
  projects: {
    type: Array,
    validate: {
      validator: function (array) {
        return array.length <= 2;
      },
      message: "Projects array must have at most 2 elements.",
    },
  },
});

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
  student1: {
    type: String,
    ref: "Student",
  },
  student2: {
    type: String,
    ref: "Student",
  },
  student3: {
    type: String,
    ref: "Student",
  },
  student4: {
    type: String,
    ref: "Student",
  },
  guide: {
    type: String,
    ref: "Guide",
  },
  reviewer: {
    type: Array,
    validate: {
      validator: function (array) {
        return array.length <= 1;
      },
      message: "Reviewer array must have at most 1 element.",
    },
  },
  reviewDate: {
    type: Object,
    default: null,
  },
  firebaseFolder: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
const Guide = mongoose.model("Guide", guideSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Project,
  Guide,
  Student,
};
