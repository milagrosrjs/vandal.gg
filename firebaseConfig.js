// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyApyVdfxlnp_J0wz1N3fAWGf9Kk2fswt5c",
  authDomain: "vandallogin.firebaseapp.com",
  projectId: "vandallogin",
  storageBucket: "vandallogin.appspot.com",
  messagingSenderId: "363237174575",
  appId: "1:363237174575:web:6d6c7de8c5c199c91185da",
  measurementId: "G-TRGDWCV8BX"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };