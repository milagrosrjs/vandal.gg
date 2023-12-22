// perfil.js
import { auth } from "./firebaseauth.js";
import { doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';
import { firestore, storage } from './firebaseconfig.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    auth.onAuthStateChanged(async (user) => {
      const messageContainer = document.getElementById('messageContainer');
      const userDataContainer = document.getElementById('userDataContainer');
      const userIcon = document.getElementById('userIcon');
      const iconForm = document.getElementById('iconForm');
      const iconInput = document.getElementById('iconInput');

      if (user) {
        // El usuario está autenticado

        // Obtener la información del usuario desde Firestore
        const userDoc = await getDoc(doc(firestore, 'usuarios', user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Mostrar el icono, nombre y correo del usuario
          if (userIcon) {
            userIcon.src = userData.iconURL;
          }

          const userDataHTML = `
            <p>Nombre: ${user.displayName}</p>
            <p>Email: ${user.email}</p>
          `;

          if (userDataContainer) {
            userDataContainer.innerHTML = userDataHTML;
          }
        }

        // Agregar el evento de cambio al input de tipo archivo
        if (iconInput) {
          iconInput.addEventListener('change', (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              console.log('Archivo seleccionado:', selectedFile);
            }
          });
        }

        // Agregar el evento de envío del formulario
        if (iconForm) {
          iconForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const iconFile = iconInput.files[0];
            if (iconFile) {
              try {
                // Subir el icono a Firebase Storage
                const storageRef = getStorage(storage.app, 'gs://vandallogin.appspot.com');
                const iconRef = ref(storageRef, `iconos/${user.uid}/profileIcon`);
                const snapshot = await uploadBytes(iconRef, iconFile);

                console.log('Icono subido con éxito');

                // Obtener la URL del icono subido
                const downloadURL = await getDownloadURL(iconRef);

                // Actualizar la información del usuario en Firestore
                const userRef = doc(firestore, 'usuarios', user.uid);
                await updateDoc(userRef, {
                  iconURL: downloadURL,
                });

                if (messageContainer) {
                  messageContainer.innerHTML = '<p>Icono subido con éxito</p>';
                }
              } catch (error) {
                console.error('Error al subir el icono o actualizar la información del usuario:', error);
                if (messageContainer) {
                  messageContainer.innerHTML = '<p>Error al subir el icono</p>';
                }
              }
            }
          });
        }

      } else {
        // El usuario no está autenticado
        if (userDataContainer) {
          userDataContainer.innerHTML = '<p>No hay usuario autenticado.</p>';
        }
      }
    });
  } catch (error) {
    console.error('Error al cargar el módulo de Firebase:', error);
  }
});