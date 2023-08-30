const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "reviewer", "user"], //user category for student and guide
    required: true,
  },
  permission: {
    projects: {
      view: String, // all or own
      create: Boolean,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
