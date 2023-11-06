const express = require('express');
const connection = require('../bd'); // Importa la conexión a la base de datos
const app = express();

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Ruta para el registro de usuarios
app.post('/registro', (req, res) => {
  console.log('Recibida una solicitud POST en la ruta /registro');
  
  // Recibe los datos del formulario
  const { nombre, email, contrasena } = req.body;

  // Agrega registros para verificar los datos recibidos
  console.log('Datos recibidos: nombre:', nombre, 'email:', email, 'contrasena:', contrasena);

  // Realiza la inserción de datos en la tabla Usuarios
  connection.query(
    'INSERT INTO Usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
    [nombre, email, contrasena],
    (error, results) => {
      if (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
      } else {
        console.log('Usuario registrado con éxito');

        // Realiza una consulta SELECT para verificar los datos recién insertados
        connection.query('SELECT * FROM Usuarios', (selectError, selectResults) => {
          if (selectError) {
            console.error('Error al seleccionar datos:', selectError);
          } else {
            console.log('Datos de usuarios:', selectResults);
          }
        });

        res.status(200).json({ message: 'Usuario registrado con éxito' });
      }
    }
  );
});


module.exports = app;
