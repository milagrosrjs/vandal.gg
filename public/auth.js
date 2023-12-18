import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { app } from "./firebaseconfig.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

// Configura la persistencia en sesión del navegador
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // La sesión de usuario se mantendrá después de actualizar la página
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });

// Exporta el método para obtener el usuario actual
const currentUser = () => auth.currentUser;

export { auth, provider, signInWithPopup, firestore, currentUser };