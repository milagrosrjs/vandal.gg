// En tu archivo JavaScript
import { auth } from "./auth.js";

const userDataContainer = document.getElementById('userDataContainer');

// Observador de cambios en la autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    // El usuario está autenticado
    const userDataHTML = `
      <p>ID: ${user.uid}</p>
      <p>Nombre: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
    `;
    userDataContainer.innerHTML = userDataHTML;
  } else {
    // El usuario no está autenticado
    userDataContainer.innerHTML = '<p>No hay usuario autenticado.</p>';
  }
});