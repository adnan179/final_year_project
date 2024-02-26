const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
    enum: ["all", "users", "reviewers"],
  },
  subject: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  attachments: [
    {
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
