const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage, firestore } = require("../config/firebase-config");
const {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} = require("firebase/storage");

const {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} = require("firebase/firestore");

const upload = multer({
  storage: multer.memoryStorage(),
});

// Middleware to handle file upload
router.post(
  "/:userEmail/:projectNumber/upload",
  upload.array("files"),
  async (req, res) => {
    const { projectNumber, userEmail } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString(); // Get the current year
      const folderName = `${projectNumber}-${currentYear}`; // Folder name format: projectNumber-currentYear

      const uploadPromises = files.map(async (file) => {
        const fileName = `${currentDate.toISOString().split("T")[0]}_${
          file.originalname
        }`; // Append current date to original file name
        const fileBuffer = file.buffer;
        const metadata = {
          contentType: file.mimetype,
          size: file.size,
          uploadedAt: currentDate.toISOString(),
          uploadedBy: userEmail || "anonymous",
        };

        // Upload file to Firebase Storage
        const storageRef = ref(storage, `${folderName}/${fileName}`);
        const snapshot = await uploadBytes(storageRef, fileBuffer);
        const fileURL = await getDownloadURL(snapshot.ref);

        // Save file metadata to Firestore
        const fileData = {
          projectNumber,
          fileName,
          metadata,
          fileURL,
        };

        // Construct the collection reference using the projectNumber and current year
        const collectionRef = collection(
          firestore,
          `${projectNumber}-${currentYear}`
        );

        // Add fileData to Firestore collection
        const fileDocRef = await addDoc(collectionRef, fileData);

        // Return uploaded file metadata
        return fileData;
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      return res
        .status(200)
        .json({ message: "Files uploaded successfully", uploadedFiles });
    } catch (error) {
      console.error("Error uploading files:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Middleware to fetch files from project folder
router.get("/:projectNumber/files", async (req, res) => {
  const projectNumber = req.params.projectNumber;
  const currentYear = new Date().getFullYear().toString(); // Get the current year

  try {
    const collectionName = `${projectNumber}-${currentYear}`; // Form the collection name based on projectNumber and currentYear

    // Get a reference to the Firestore collection
    const collectionRef = collection(firestore, collectionName);

    // Get all documents (files) in the collection
    const querySnapshot = await getDocs(collectionRef);

    // Process each document to extract metadata
    const filesData = querySnapshot.docs.map((doc) => {
      const fileData = doc.data();
      // Extract relevant metadata fields
      const fileName = fileData.fileName;
      const size = fileData.metadata.size || 0;
      const uploadedAt = fileData.metadata.uploadedAt;
      const uploadedBy = fileData.metadata.uploadedBy;
      const fileType = fileName.split(".").pop();
      const downloadURL = fileData.fileURL;

      // Return structured metadata
      return {
        fileName,
        size,
        uploadedAt,
        uploadedBy,
        fileType,
        downloadURL,
      };
    });

    // Return the list of files with metadata
    return res.status(200).json({ files: filesData });
  } catch (error) {
    console.error("Error fetching files:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to handle file deletion
router.delete("/:projectNumber/delete/:fileName", async (req, res) => {
  const projectNumber = req.params.projectNumber;
  const fileName = req.params.fileName;

  try {
    const currentYear = new Date().getFullYear().toString(); // Get the current year
    const folderName = `${projectNumber}-${currentYear}`; // Form the collection name based on projectNumber and currentYear

    // Delete file from Firebase Storage
    const storageRef = ref(storage, `${folderName}/${fileName}`);
    await deleteObject(storageRef);

    // Delete file metadata from Firestore
    const querySnapshot = await getDocs(
      query(
        collection(firestore, folderName), // Use folderName to specify the collection
        where("projectNumber", "==", projectNumber),
        where("fileName", "==", fileName)
      )
    );

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "File not found" });
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
