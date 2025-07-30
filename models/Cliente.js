const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["Teléfono", "Correo", "Dirección", "Otro"],
    required: true,
  },
  valor: {
    type: String,
    required: true,
  },
  preferido: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  identificacion: { type: String, required: true, unique: true },
  contactos: {
    type: [contactoSchema],
    validate: {
      validator: function (contactos) {
        const tipos = contactos.map(c => c.tipo);
        return new Set(tipos).size === tipos.length;
      },
      message: "No se pueden repetir tipos de contacto",
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Cliente", clienteSchema);
