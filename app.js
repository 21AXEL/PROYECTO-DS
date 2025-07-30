const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); // rutas de proyectos y tareas
const clienteRoutes = require('./routes/cliente'); // rutas de clientes
const authRoutes = require('./routes/auth'); // rutas de autenticación

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor Backend de Proyectos activo 🚀');
});

// Rutas públicas de autenticación
app.use('/', authRoutes);

// Rutas principales protegidas bajo /api
app.use('/api', routes);          // rutas para proyectos y tareas
app.use('/api', clienteRoutes);   // rutas para clientes

module.exports = app;
