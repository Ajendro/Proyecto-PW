const mongoose = require('mongoose');

// Conectar a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/marketplace');

// Manejar eventos de conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('¡Conexión a la base de datos establecida correctamente!');
});