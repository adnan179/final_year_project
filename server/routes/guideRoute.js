const express = require("express");
const router = express.Router();
const { Guide } = require("../models/mainSchema");

router.get("/:guideEmployeeId", async (req, res) => {
  try {
    const guide = await Guide.findOne({
      employeeId: req.params.guideEmployeeId,
    });
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
