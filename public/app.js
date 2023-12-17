// app.js
import { app, db } from "./firebaseconfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Función para obtener los productos de la base de datos
async function obtenerProductos() {
    const productosCollection = collection(db, 'productos');
    const productosSnapshot = await getDocs(productosCollection);
    const productos = productosSnapshot.docs.map(doc => doc.data());

    return productos;
}
// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Recupera la lista de productos en el carrito desde localStorage (si existe)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agrega el producto seleccionado al carrito
    carrito.push({ nombre, precio });

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualiza el contador del carrito
    actualizarCarrito();
}

// Agrega un evento clic a todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll(".btn-agregar");
botonesAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const nombre = boton.getAttribute("data-nombre");
        const precio = parseFloat(boton.getAttribute("data-precio"));
        agregarAlCarrito(nombre, precio);
    });
});

// Función para actualizar el contador y el botón del carrito
function actualizarCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    let contador = JSON.parse(localStorage.getItem("carrito"))?.length || 0;
    contadorCarrito.textContent = contador;
}
// Función para renderizar los productos en el HTML
function renderizarProductos(productos) {
    const contenedorProductos = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
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
}

// Llama a la función para obtener los productos y luego renderizarlos
obtenerProductos().then(productos => {
    renderizarProductos(productos);
});