import { auth } from "./auth.js";
import { storeUserDataInFirestore } from "./firebaseauth.js";

auth.onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;

        // Llama a la función para almacenar la información del usuario
        storeUserDataInFirestore(uid, displayName, email);
    } else {
        // El usuario no ha iniciado sesión
    }
});
