// firebaseauth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { app } from "./firebaseConfig.js";
import { getFirestore, collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // La sesión de usuario se mantendrá después de actualizar la página
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });
export { auth, provider, signInWithPopup, firestore };

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