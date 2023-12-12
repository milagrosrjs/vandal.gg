// roulette.js
import { db } from "../../firebaseConfig.js";
import { getFirestore, collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async function () {
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spinBtn');
    const resultMessage = document.getElementById('resultMessage');

    // Obtén los datos de la colección "equipos" de Firebase
    const equiposCollection = collection(db, 'equipos');
    const equiposSnapshot = await getDocs(equiposCollection);
    const equiposData = equiposSnapshot.docs.map(doc => doc.data());

    // Calcula el ángulo de separación entre los equipos
    const angleStep = 360 / equiposData.length;

    // Ajuste: factor para acercar más al centro
    const factorAjuste = 0.6;

    // Función para generar colores aleatorios en formato hexadecimal
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Agrega las divisiones de la ruleta con los nombres y colores aleatorios de los equipos
    equiposData.forEach((equipo, index) => {
        const division = document.createElement('div');
        division.classList.add('team-name');

        // Calcula la posición centrada y orientada al ángulo original
        const rotationAngle = angleStep * index;
        const x = Math.cos((rotationAngle * Math.PI) / 180) * (roulette.offsetWidth / 2) * factorAjuste;
        const y = Math.sin((rotationAngle * Math.PI) / 180) * (roulette.offsetHeight / 2) * factorAjuste;

        // Aplica las transformaciones
        division.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotationAngle + 180}deg)`;

        // Crea un contenedor para el color aleatorio y el texto
        const teamContainer = document.createElement('div');
        teamContainer.classList.add('team-circle');

        // Asigna colores aleatorios al fondo del cuadrado
        const randomColor = getRandomColor();
        teamContainer.style.backgroundColor = randomColor;

        // Agrega el texto del equipo al contenedor
        const teamText = document.createElement('span');
        teamText.classList.add('team-text');
        teamText.innerText = equipo.nombre;

        // Agrega el contenedor del equipo al elemento de la ruleta
        teamContainer.appendChild(teamText);
        division.appendChild(teamContainer);

        roulette.appendChild(division);
    });

    // Función para girar la ruleta y seleccionar equipos
    async function spinRoulette() {
        const randomDegrees = Math.floor(Math.random() * 360) + 3600; // Gira al menos 10 vueltas
        roulette.style.transition = 'transform 3s cubic-bezier(0.4, 2.1, 0.5, 0.9)';
        roulette.style.transform = `rotate(${randomDegrees}deg)`;

        // Deshabilita el botón durante la animación
        spinBtn.disabled = true;

        // Obtén los equipos seleccionados después de la animación
        setTimeout(async () => {
            const winnerIndex = Math.floor((randomDegrees % 360) / angleStep);
            const winner = equiposData[winnerIndex].nombre;

            // Encuentra el índice del equipo perdedor
            let loserIndex = (winnerIndex + Math.floor(equiposData.length / 2)) % equiposData.length;
            const loser = equiposData[loserIndex].nombre;

            // Obtiene la fecha y hora actual
            const currentDate = new Date();
            const fecha = currentDate.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
            const hora = currentDate.toISOString().split('T')[1].substring(0, 8); // Formato: HH:MM:SS

            // Muestra el mensaje de torneo creado
            resultMessage.innerText = `Torneo creado: ${winner} vs ${loser}`;

            // Almacena la información del enfrentamiento en la colección "torneos"
            const torneosCollection = collection(db, 'torneos');
            await addDoc(torneosCollection, { equipo1: winner, equipo2: loser, fecha, hora });

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
    document.getElementById('backBtn').addEventListener('click', function () {
        // Redirige a index.html
        window.location.href = './index.html';
    });
});
