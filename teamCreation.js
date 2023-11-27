// teamCreation.js
import { app } from "./firebaseConfig.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

document.getElementById('createTeamBtn').addEventListener('click', async () => {
    const teamName = document.getElementById('teamName').value;
    const teamDescription = document.getElementById('teamDescription').value;

    // Validar que se ingresen datos
    if (!teamName || !teamDescription) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Acceder a Firestore y agregar un nuevo equipo
    const db = getFirestore(app);
    const teamsCollection = collection(db, 'equipos');

    try {
        const docRef = await addDoc(teamsCollection, {
            nombre: teamName,
            descripcion: teamDescription,
            miembros: [] // Puedes inicializar la lista de miembros aquí
        });

        alert(`Equipo creado con éxito. ID: ${docRef.id}`);
    } catch (error) {
        console.error('Error al crear el equipo:', error);
        alert('Hubo un error al crear el equipo. Por favor, inténtalo de nuevo.');
    }
});
