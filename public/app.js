// app.js
import { db } from "./firebaseconfig.js";
import { auth, currentUser } from './auth.js'; // Asegúrate de importar currentUser correctamente
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Función para obtener los productos de la base de datos
async function obtenerProductos() {
    const productosCollection = collection(db, 'productos');
    const productosSnapshot = await getDocs(productosCollection);
    const productos = productosSnapshot.docs.map(doc => doc.data());

    return productos;
}

// Función para agregar un producto al carrito
async function agregarAlCarrito(producto) {
    // Verificar si el usuario está autenticado
    const user = currentUser(auth);

    if (user) {
        // Recupera la lista de productos en el carrito desde localStorage (si existe)
        const carrito = JSON.parse(localStorage.getItem(`carrito_${user.uid}`)) || [];

        // Agrega el producto seleccionado al carrito
        carrito.push(producto);

        // Guarda el carrito actualizado en localStorage asociado con la identificación del usuario
        localStorage.setItem(`carrito_${user.uid}`, JSON.stringify(carrito));

        // Actualiza el contador del carrito
        actualizarCarrito();
    } else {
        // El usuario no está autenticado, mostrar un mensaje o redirigir al login
        alert('Debes iniciar sesión para agregar productos al carrito.');
    }
}

// Función para actualizar el contador y el botón del carrito
function actualizarCarrito() {
    // Verificar si el usuario está autenticado
    const user = currentUser(auth);

    if (user) {
        const contadorCarrito = document.getElementById('contador-carrito');
        let contador = JSON.parse(localStorage.getItem(`carrito_${user.uid}`))?.length || 0;
        contadorCarrito.textContent = contador;
    }
}

// Función para renderizar los productos en el HTML
function renderizarProductos(productos) {
    const contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}">
                <div class="card-body">
                    <h2 class="card-title">${producto.nombre}</h2>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-primary btn-agregar"
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}">Agregar al carrito</button>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(card);
    });

    // Elimina los manejadores de eventos existentes antes de agregar nuevos
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(function (boton) {
        boton.removeEventListener('click', agregarAlCarrito);
    });

    // Agrega un evento clic a todos los botones "Agregar al carrito"
    botonesAgregar.forEach(function (boton) {
        boton.addEventListener('click', function () {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));
            const producto = { nombre, precio };
            agregarAlCarrito(producto);
        });
    });

    // Actualiza el contador después de renderizar los productos
    actualizarCarrito();
}
// Inicializa el carrito en localStorage si no existe
if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([]));
}

// Llama a la función para obtener los productos y luego renderizarlos
obtenerProductos().then(productos => {
    renderizarProductos(productos);
});
