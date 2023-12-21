import { auth, firestore, storage } from "./firebaseauth.js";

const userDataContainer = document.getElementById('userDataContainer');
const iconForm = document.getElementById('iconForm');
const iconInput = document.getElementById('iconInput');

// Observador de cambios en la autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    // El usuario está autenticado
    const userDataHTML = `
      <p>Nombre: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
    `;
    userDataContainer.innerHTML = userDataHTML;

    // Agregar el evento de cambio al input de tipo archivo
    iconInput.addEventListener('change', (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        console.log('Archivo seleccionado:', selectedFile);
      }
    });

    // Agregar el evento de envío del formulario
    iconForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const iconFile = iconInput.files[0];
      if (iconFile) {
        try {
          // Subir el icono a Firebase Storage
          const storageRef = storage.ref();
          const iconRef = storageRef.child(`icons/${user.uid}/profileIcon`);

          const snapshot = await iconRef.put(iconFile);
          console.log('Icono subido con éxito');

          // Obtener la URL del icono subido
          const downloadURL = await snapshot.ref.getDownloadURL();

          // Actualizar la información del usuario en Firestore
          const userRef = firestore.collection('usuarios').doc(user.uid);
          await userRef.update({
            iconURL: downloadURL,
          });

          console.log('Información del usuario actualizada con éxito');
        } catch (error) {
          console.error('Error al subir el icono o actualizar la información del usuario:', error);
        }
      }
    });

  } else {
    // El usuario no está autenticado
    userDataContainer.innerHTML = '<p>No hay usuario autenticado.</p>';
  }
});
