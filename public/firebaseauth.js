// firebaseauth.js
// firebaseauth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { app } from "./firebaseconfig.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);  // Asegúrate de tener esta línea en tu código
const provider = new GoogleAuthProvider();

let lastSignInTime = 0;

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // La sesión de usuario se mantendrá después de actualizar la página
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });

export { auth, provider, signInWithPopup, firestore, storage };
export async function storeUserDataInFirestore(uid, displayName, email) {
  const usersCollection = collection(firestore, 'usuarios');
  const userDoc = doc(usersCollection, uid);

  try {
    const docSnapshot = await getDoc(userDoc);

    if (docSnapshot.exists()) {
      // Usuario existente, puedes actualizar la información si es necesario
      // await updateDoc(userDoc, { displayName, email, ... });
    } else {
      // Usuario no existe, crea un nuevo documento
      await setDoc(userDoc, { displayName, email });
    }
  } catch (error) {
    console.error("Error al acceder a Firestore:", error);
  }
}

export async function signInWithThrottle() {
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastSignInTime;

  // Permitir iniciar sesión solo si han pasado al menos 30 segundos
  if (timeDiff >= 30000) {
    try {
      lastSignInTime = currentTime;
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      storeUserDataInFirestore(user.uid, user.displayName, user.email);
      return result;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  } else {
    console.warn("Debe esperar al menos 30 segundos entre iniciativas de sesión.");
  }
}