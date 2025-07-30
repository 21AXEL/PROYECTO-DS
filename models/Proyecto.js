const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  nombreTarea: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaEntrega: { type: Date, required: true },
  completado: { type: Boolean, default: false },
});

const ProyectoSchema = new mongoose.Schema(
  {
    nombreProyecto: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    costo: { type: Number, required: true },
    estado: {
      type: String,
      enum: ['Iniciado', 'Completado', 'Cancelado'],
      default: 'Iniciado',
    },
    tareas: [TareaSchema],
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Proyecto', ProyectoSchema);
