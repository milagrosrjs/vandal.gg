// teamCreation.js
import { app } from "./firebaseconfig.js";
import { auth, provider, signInWithPopup, firestore } from './auth.js';
import { getFirestore, collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

let currentUser; // Declarar la variable currentUser

async function createTeam() {
    const teamName = document.getElementById('teamName').value;
    const teamDescription = document.getElementById('teamDescription').value;

    // Validar que se ingresen datos
    if (!teamName || !teamDescription) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Verificar si el usuario está autenticado
    currentUser = auth.currentUser; // Asignar el valor de currentUser aquí

    if (currentUser) {
        // El usuario está autenticado, permitir la creación del equipo
        // Luego, puedes llamar a la función que maneja la creación del equipo
        const teamId = await handleTeamCreation(teamName, teamDescription);
        if (teamId) {
            // Generar imagen con OpenAI DALL·E
            const imageUrl = await generateTeamImage(teamId, teamDescription);
            // Actualizar la URL de la imagen en la colección de equipos
            if (imageUrl) {
                await updateTeamImage(teamId, imageUrl);
            }
        }
    } else {
        // El usuario no está autenticado, mostrar un mensaje o redirigir al login
        alert('Debes iniciar sesión para crear un equipo.');
    }
}

async function handleTeamCreation(teamName, teamDescription) {
    const db = getFirestore(app);
    const teamsCollection = collection(db, 'equipos');

    try {
        const docRef = await addDoc(teamsCollection, {
            nombre: teamName,
            descripcion: teamDescription,
            miembros: [],
            imageUrl: null, // Inicialmente nulo, se actualizará después de generar la imagen
        });

        alert(`Equipo creado con éxito. ID: ${docRef.id}`);
        return docRef.id; // Devolver el ID del equipo creado
    } catch (error) {
        console.error('Error al crear el equipo:', error);
        alert('Hubo un error al crear el equipo. Por favor, debes estar logeado para realizar esta acción.');
        return null;
    }
}

async function generateTeamImage(teamId, teamDescription) {
    // Llamada a la API de OpenAI DALL·E para generar una imagen
    const OPENAI_API_KEY = "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"; // Reemplazar con tu clave de API de OpenAI
    const prompt = `Create an image for team "${teamId}" with description: "${teamDescription}"`;

    try {
        const res = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            body: JSON.stringify({
                prompt,
                n: 1,
                size: "256x256",
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
        });

        const data = await res.json();
        console.log(data);

        // Devolver la URL de la imagen generada
        return data.data[0].url;
    } catch (error) {
        console.error("Error al generar la imagen:", error);
        alert("Hubo un error al generar la imagen para el equipo.");
        return null;
    }
}

async function updateTeamImage(teamId, imageUrl) {
    // Actualizar la URL de la imagen en la colección de equipos
    const db = getFirestore(app);
    const teamDoc = doc(db, 'equipos', teamId);

    try {
        await updateDoc(teamDoc, {
            imageUrl: imageUrl,
        });
        console.log(`Imagen actualizada para el equipo ${teamId}: ${imageUrl}`);
    } catch (error) {
        console.error('Error al actualizar la imagen del equipo:', error);
        alert('Hubo un error al actualizar la imagen del equipo.');
    }
}

document.getElementById('createTeamBtn').addEventListener('click', createTeam);
export { currentUser };
