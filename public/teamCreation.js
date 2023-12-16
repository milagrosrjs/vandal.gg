// teamCreation.js
import { app } from "./firebaseconfig.js";
import { auth, provider, signInWithPopup, firestore } from './auth.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

function createTeam() {
    const teamName = document.getElementById('teamName').value;
    const teamDescription = document.getElementById('teamDescription').value;
  
    // Validar que se ingresen datos
    if (!teamName || !teamDescription) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Verificar si el usuario está autenticado
    const user = auth.currentUser;
    if (user) {
      // El usuario está autenticado, permitir la creación del equipo
      // Luego, puedes llamar a la función que maneja la creación del equipo
      handleTeamCreation(teamName, teamDescription);
    } else {
      // El usuario no está autenticado, mostrar un mensaje o redirigir al login
      alert('Debes iniciar sesión para crear un equipo.');
    }
  }
  
  function handleTeamCreation(teamName, teamDescription) {
    // Aquí va el código existente para la creación del equipo
    // ...
  
    alert('Equipo creado con éxito.');
  }
  
  document.getElementById('createTeamBtn').addEventListener('click', createTeam);