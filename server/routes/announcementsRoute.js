const express = require("express");
const multer = require("multer");
const {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("../config/firebase-config");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const Announcement = require("../models/annoucementSchema");

//route to create announcements
router.post("/", upload.array("attachments"), async (req, res) => {
  try {
    const { to, subject, desc } = req.body;
    let attachments = [];

    // Check if attachments were provided
    if (req.files && req.files.length > 0) {
      // Upload attachments to Firebase storage
      for (const attachment of req.files) {
        const storageRef = ref(
          storage,
          `announcements/${to}/${attachment.originalname}`
        );
        const snapshot = await uploadBytes(storageRef, attachment.buffer);
        const attachmentUrl = await getDownloadURL(snapshot.ref);
        attachments.push({
          fileName: attachment.originalname,
          filePath: attachmentUrl,
        });
      }
    }

    // Create a new announcement
    const announcement = new Announcement({
      to,
      subject,
      desc,
      attachments,
      date: new Date(),
    });

    // Save the announcement to MongoDB
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//route to fetch all announcements for admin
router.get("/", async (req, res) => {
  try {
    // Fetch all announcements from MongoDB
    const announcements = await Announcement.find();

    // Iterate through each announcement to get download URLs for attachments
    const announcementsWithUrls = await Promise.all(
      announcements.map(async (announcement) => {
        const attachmentsWithUrls = await Promise.all(
          announcement.attachments.map(async (attachment) => {
            const storageRef = ref(storage, attachment.filePath);
            const downloadUrl = await getDownloadURL(storageRef);
            return {
              ...attachment,
              downloadUrl,
            };
          })
        );

        return {
          ...announcement.toJSON(),
          attachments: attachmentsWithUrls,
        };
      })
    );

    res.status(200).json(announcementsWithUrls);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//route to fetch all announcements using to field
router.get("/:to", async (req, res) => {
  try {
    const to = req.params.to;
    // Fetch all announcements from MongoDB
    const announcements = await Announcement.find({ to: to });

    // Iterate through each announcement to get download URLs for attachments
    const announcementsWithUrls = await Promise.all(
      announcements.map(async (announcement) => {
        const attachmentsWithUrls = await Promise.all(
          announcement.attachments.map(async (attachment) => {
            const storageRef = ref(storage, attachment.filePath);
            const downloadUrl = await getDownloadURL(storageRef);
            return {
              ...attachment,
              downloadUrl,
            };
          })
        );

        return {
          ...announcement.toJSON(),
          attachments: attachmentsWithUrls,
        };
      })
    );

    res.status(200).json(announcementsWithUrls);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//route to delete announcements
router.delete("/:_id", async (req, res) => {
  try {
    const announcementId = req.params._id;
    console.log(announcementId);
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({ error: "Didn't find any Announcement" });
    }

    // Delete attachments from Firebase Storage if present
    if (announcement.attachments && announcement.attachments.length > 0) {
      // Delete each attachment file
      for (const attachment of announcement.attachments) {
        const fileRef = ref(storage, attachment.filePath);
        await deleteObject(fileRef);
      }
    }
    //deleting the announcement from the mongoDB
    await Announcement.findByIdAndDelete(announcementId);

    return res
      .status(201)
      .json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.log("error deleting the announcement: " + error);
    return res.status(500).json({ message: "Error deleting the announcement" });
  }
});

module.exports = router;
