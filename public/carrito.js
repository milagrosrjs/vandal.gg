document.addEventListener("DOMContentLoaded", function () {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
  
    // Recupera el carrito de localStorage (si existe)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Función para calcular el total del carrito
    function calcularTotal() {
      let total = 0;
      carrito.forEach(function (producto) {
        total += producto.precio;
      });
      return total.toFixed(2);
    }
  
    // Muestra los productos del carrito en la página
    carrito.forEach(function (producto) {
      const li = document.createElement("li");
      li.textContent = producto.nombre + " - $" + producto.precio.toFixed(2);
      listaCarrito.appendChild(li);
    });
  
    // Muestra el total del carrito en la página
    totalCarrito.textContent = "Total: $" + calcularTotal();
  
    // Agregar más funcionalidades aquí, como eliminar productos del carrito si es necesario
  });