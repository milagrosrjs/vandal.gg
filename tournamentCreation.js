// tournamentCreation.js
import { app, db } from "./firebaseConfig.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

document.getElementById('createTournamentBtn').addEventListener('click', async () => {
    // ... (otro código del botón de crear torneo)

    // Obtener todos los equipos almacenados en Firestore
    const teamsCollection = collection(db, 'equipos');
    const teamsSnapshot = await getDocs(teamsCollection);

    const teams = [];
    teamsSnapshot.forEach((doc) => {
        teams.push({
            id: doc.id,
            nombre: doc.data().nombre,
            descripcion: doc.data().descripcion,
            // Puedes agregar más campos según sea necesario
        });
    });

    // Ahora, 'teams' contiene todos los equipos almacenados en Firestore

    // Implementar la lógica de la ruleta y mostrar los enfrentamientos
    if (teams.length >= 2) {
        const matchups = generateMatchups(teams);
        displayMatchups(matchups);
    } else {
        alert('Se necesitan al menos dos equipos para crear un torneo.');
    }
});

function generateMatchups(teams) {
    // Implementa la lógica de la ruleta aquí
    // Devuelve una matriz de enfrentamientos, por ejemplo: [['EquipoA', 'EquipoB'], ['EquipoC', 'EquipoD']]
    // Puedes implementar lógica más avanzada según sea necesario
    return [];
}

function displayMatchups(matchups) {
    // Implementa la lógica para mostrar los enfrentamientos en tu interfaz de usuario
    // Puedes usar el DOM para actualizar la información en la página
    console.log('Enfrentamientos:', matchups);
    alert('Enfrentamientos generados. Consulta la consola para ver la información.');
}