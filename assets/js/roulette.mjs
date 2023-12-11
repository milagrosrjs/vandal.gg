// roulette.js
import { db } from "../../firebaseConfig.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async function () {
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spinBtn');
    const resultMessage = document.getElementById('resultMessage');

    // Obtén los datos de la colección "equipos" de Firebase
    const equiposCollection = collection(db, 'equipos');
    const equiposSnapshot = await getDocs(equiposCollection);
    const equiposData = equiposSnapshot.docs.map(doc => doc.data());

    // Agrega las divisiones de la ruleta con los nombres de los equipos
    equiposData.forEach((equipo, index) => {
        const division = document.createElement('div');
        division.classList.add('team-name');
        division.style.transform = `rotate(${(index * 360) / equiposData.length + 90}deg)`;
        division.innerText = equipo.nombre;
        roulette.appendChild(division);
    });

    // Función para girar la ruleta y seleccionar equipos
    function spinRoulette() {
        const randomDegrees = Math.floor(Math.random() * 360) + 3600; // Gira al menos 10 vueltas
        roulette.style.transition = 'transform 3s ease-out';
        roulette.style.transform = `rotate(${randomDegrees}deg)`;

        // Deshabilita el botón durante la animación
        spinBtn.disabled = true;

        // Obtén los equipos seleccionados después de la animación
        setTimeout(async () => {
            const winnerIndex = Math.floor((randomDegrees % 360) / (360 / equiposData.length));
            const winner = equiposData[winnerIndex].nombre;

            // Encuentra el índice del equipo perdedor
            let loserIndex = (winnerIndex + Math.floor(equiposData.length / 2)) % equiposData.length;
            const loser = equiposData[loserIndex].nombre;

            // Muestra el mensaje de torneo creado
            resultMessage.innerText = `Torneo creado: ${winner} vs ${loser}`;

            // Almacena la información del enfrentamiento en la colección "torneos"
            const torneosCollection = collection(db, 'torneos');
            await addDoc(torneosCollection, { equipo1: winner, equipo2: loser });

            // Restaura el estado después de la animación
            setTimeout(() => {
                roulette.style.transition = 'none';
                roulette.style.transform = 'rotate(0deg)';
                spinBtn.disabled = false;
                resultMessage.innerText = ''; // Limpia el mensaje después de un tiempo
            }, 3000); // El mismo tiempo que la duración de la animación
        }, 3000); // El mismo tiempo que la duración de la animación
    }

    // Agrega el evento de clic al botón de girar
    spinBtn.addEventListener('click', spinRoulette);
});

