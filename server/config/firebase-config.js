// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBaKWLxti63LzrXzkkqCjNjw8NW6iYYN78",
  authDomain: "project-management-de25a.firebaseapp.com",
  projectId: "project-management-de25a",
  storageBucket: "project-management-de25a.appspot.com",
  messagingSenderId: "855694484040",
  appId: "1:855694484040:web:c4266b7629cbe79d406e7d",
  measurementId: "G-KGGMDS2PV9",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

module.exports = { firestore, storage };
