import { auth } from "./auth.js";
import { storeUserDataInFirestore } from "./firebaseauth.js";

let currentUser = null;

auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        };

        // Llama a la función para almacenar o actualizar la información del usuario
        storeUserDataInFirestore(currentUser.uid, currentUser.displayName, currentUser.email);
    } else {
        currentUser = null;
        // El usuario no ha iniciado sesión
    }
});
