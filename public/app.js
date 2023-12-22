// app.js
import { db } from "./firebaseconfig.js";
import { auth} from './auth.js';

import { currentUser } from './teamCreation.js';

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Función para obtener los productos de la base de datos
async function obtenerProductos() {
    const productosCollection = collection(db, 'productos');
    const productosSnapshot = await getDocs(productosCollection);
    const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productos;
}

// Función para agregar un producto al carrito
async function agregarAlCarrito(producto) {
    const user = currentUser(auth);

    if (user) {
        const carrito = JSON.parse(localStorage.getItem(`carrito_${user.uid}`)) || [];
        carrito.push({ nombre: producto.nombre, precio: producto.precio });
        localStorage.setItem(`carrito_${user.uid}`, JSON.stringify(carrito));
        actualizarCarrito();
        await renderizarProductosEnCarrito();
    } else {
        alert('Debes iniciar sesión para agregar productos al carrito.');
    }
}

// Función para actualizar el contador y el botón del carrito
function actualizarCarrito() {
    const user = currentUser(auth);

    if (user) {
        const contadorCarrito = document.getElementById('contador-carrito');

        if (contadorCarrito) {
            let contador = JSON.parse(localStorage.getItem(`carrito_${user.uid}`))?.length || 0;
            contadorCarrito.textContent = contador;
        }
    }
}

// Define el tamaño deseado de la imagen
const IMG_WIDTH = 20;
const IMG_HEIGHT = 20;

// Función para renderizar los productos en la tienda
async function renderizarProductosEnTienda() {
    const productos = await obtenerProductos();
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        const imageUrl = producto.imagen || '';

        card.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" width="${IMG_WIDTH}" height="${IMG_HEIGHT}" class="card-img-top" alt="${producto.nombre}">
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

        const botonesAgregar = card.querySelectorAll('.btn-agregar');
        botonesAgregar.forEach(function (boton) {
            boton.addEventListener('click', function () {
                const nombre = boton.getAttribute('data-nombre');
                const precio = parseFloat(boton.getAttribute('data-precio'));
                const productoSeleccionado = { nombre, precio, ...producto };
                agregarAlCarrito(productoSeleccionado);
            });
        });
    });

    actualizarCarrito();
}

// Función para renderizar los productos en el carrito
async function renderizarProductosEnCarrito() {
    if (window.location.pathname.includes('carrito.html')) {
        const listaCarrito = document.getElementById('lista-carrito');

        if (listaCarrito) {
            const productos = await obtenerProductosEnCarrito();

            listaCarrito.innerHTML = '';
            productos.forEach(producto => {
                const listItem = document.createElement('li');
                listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
                listaCarrito.appendChild(listItem);
            });

            const totalCarrito = document.getElementById('total-carrito');
            const total = productos.reduce((acc, producto) => acc + producto.precio, 0);
            totalCarrito.textContent = `$${total.toFixed(2)}`;
        }
    }
}

async function obtenerProductosEnCarrito() {
    const user = currentUser(auth);

    if (user) {
        const carrito = JSON.parse(localStorage.getItem(`carrito_${user.uid}`)) || [];
        return carrito.map(item => ({ nombre: item.nombre, precio: item.precio }));
    } else {
        return [];
    }
}

// Llama a la función para obtener los productos y luego renderizarlos en la tienda
renderizarProductosEnTienda();

// Llama a la función para obtener los productos del carrito y luego renderizarlos
renderizarProductosEnCarrito();
