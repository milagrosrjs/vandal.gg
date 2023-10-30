// servidor.js

const express = require('express');
const app = express();
const puerto = process.env.PUERTO || 3306;

app.use(express.json()); // Middleware para analizar JSON en las solicitudes

app.use('/auth', require('./rutas/auth')); // Utiliza las rutas de autenticación

app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto ${puerto}`);
});
