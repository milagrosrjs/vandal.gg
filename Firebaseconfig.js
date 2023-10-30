import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"; // Importa Firestore

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
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa Firestore
// Agregar un documento a la colección "Torneos"
db.collection("Torneos").add({
  Nombre: "Torneo de Prueba",
  Organizador: "Organizador de Prueba",
  FechaInicio: "2023-09-01",
  FechaFinalizacion: "2023-09-10",
  // Otros campos relevantes
})
  .then((docRef) => {
    console.log("Documento agregado con ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error al agregar documento: ", error);
  });
  // Realiza una consulta para obtener todos los documentos de la colección "Torneos"
const torneosRef = collection(db, "Torneos");

getDocs(torneosRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  })
  .catch((error) => {
    console.error("Error al obtener documentos: ", error);
  });

  console.log("Operación de lectura realizada con éxito.");