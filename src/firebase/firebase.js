// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-SPyj-rnSoTPRyJc5oRRjJyykmPD-m88",
  authDomain: "rishivar-d5fa9.firebaseapp.com",
  projectId: "rishivar-d5fa9",
  storageBucket: "rishivar-d5fa9.appspot.com",
  messagingSenderId: "857052844721",
  appId: "1:857052844721:web:2dc9813f839ca621dc4890",
  measurementId: "G-F521MMRN00"
};
export const vapidKey = "BCYKJQOBfWNSzJyQs2TjcE8V_SPi0fL7GL2Ejb5RfJTXc9CS-ItY4-izSPRUiXDBHLxCo7PXUA-dUQc_px7GxY0"



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const messaging = getMessaging(app);