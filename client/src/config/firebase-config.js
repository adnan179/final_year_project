const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBaKWLxti63LzrXzkkqCjNjw8NW6iYYN78",
  authDomain: "project-management-de25a.firebaseapp.com",
  projectId: "project-management-de25a",
  storageBucket: "project-management-de25a.appspot.com",
  messagingSenderId: "855694484040",
  appId: "1:855694484040:web:c4266b7629cbe79d406e7d",
  measurementId: "G-KGGMDS2PV9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const firestore = getFirestore(app);
module.exports = { storage, firestore };
