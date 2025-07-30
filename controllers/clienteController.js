const Cliente = require("../models/Cliente");

exports.crearCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

exports.actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarCliente = async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Cliente eliminado" });
};
