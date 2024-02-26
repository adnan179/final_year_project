const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
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
  domains: {
    type: Array,
    required: true,
  },
  designation: {
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

module.exports = mongoose.model("Reviewer", reviewerSchema);
