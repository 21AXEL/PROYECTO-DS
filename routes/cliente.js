const express = require('express');
const router = express.Router();
const controlador = require('../controllers/clienteController');
const verificarToken = require('../middlewares/verificarToken');

router.use(verificarToken);

router.get('/clientes', controlador.obtenerClientes);
router.post('/clientes', controlador.crearCliente);
router.put('/clientes/:id', controlador.actualizarCliente);
router.delete('/clientes/:id', controlador.eliminarCliente);

module.exports = router;
