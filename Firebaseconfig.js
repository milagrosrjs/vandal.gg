// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApyVdfxlnp_J0wz1N3fAWGf9Kk2fswt5c",
  authDomain: "vandallogin.firebaseapp.com",
  projectId: "vandallogin",
  storageBucket: "vandallogin.appspot.com",
  messagingSenderId: "363237174575",
  appId: "1:363237174575:web:6d6c7de8c5c199c91185da",
  measurementId: "G-TRGDWCV8BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Obtener la instancia de autenticación
const loginWithGoogleButton = document.getElementById('loginWithGoogle');
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // El usuario ha iniciado sesión con éxito
      const user = result.user;
      console.log('Usuario autenticado:', user);
    })
    .catch((error) => {
      // Manejar errores de autenticación
      console.error('Error de autenticación:', error);
    });
};

// Agregar evento de clic al botón de inicio de sesión con Google
loginWithGoogleButton.addEventListener('click', loginWithGoogle);