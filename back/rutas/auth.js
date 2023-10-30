// auth.js

const express = require('express');
const router = express.Router();
const connection = require('../bd'); // Importa la conexión a la base de datos

// Ruta para el registro de usuarios
router.post('/registro', (req, res) => {
  // Implementa la lógica de registro aquí
});

// Ruta para el inicio de sesión de usuarios
router.post('/inicio-sesion', (req, res) => {
  // Implementa la lógica de inicio de sesión aquí
});

module.exports = router;
