const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'database-2.ckhkmbsillat.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'sasuke123',
  database: 'vandalgg', 
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = connection;

