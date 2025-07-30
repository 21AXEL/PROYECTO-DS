const mongoose = require('mongoose');
const Proyecto = require('../models/Proyecto');

// Obtener proyectos del usuario autenticado
exports.obtenerProyectos = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const proyectos = await Proyecto.find({ usuario: usuarioId });
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proyectos', error });
  }
};

// Crear un nuevo proyecto asignado al usuario autenticado
exports.crearProyecto = async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto({
      ...req.body,
      usuario: req.usuario.id
    });
    await nuevoProyecto.save();
    res.status(201).json({ mensaje: 'Proyecto creado exitosamente', proyecto: nuevoProyecto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear proyecto', error });
  }
};

// Agregar tarea a un proyecto del usuario autenticado
exports.agregarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findOne({ _id: id, usuario: req.usuario.id });
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });

    proyecto.tareas.push(req.body);
    await proyecto.save();
    res.status(201).json({ mensaje: 'Tarea agregada correctamente', proyecto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al agregar tarea', error });
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  const { id, tareaId } = req.params;
  try {
    const proyecto = await Proyecto.findOne({ _id: id, usuario: req.usuario.id });
    if (!proyecto) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });

    const tarea = proyecto.tareas.id(tareaId);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    Object.assign(tarea, req.body);
    await proyecto.save();
    res.status(200).json({ mensaje: 'Tarea actualizada correctamente', proyecto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar tarea', error });
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  const { id, tareaId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tareaId)) {
    return res.status(400).json({ mensaje: "ID de proyecto o tarea inválido" });
  }

  try {
    const proyecto = await Proyecto.findOneAndUpdate(
      { _id: id, usuario: req.usuario.id },
      { $pull: { tareas: { _id: tareaId } } },
      { new: true }
    );

    if (!proyecto) {
      return res.status(404).json({ mensaje: "Proyecto o tarea no encontrada" });
    }

    res.status(200).json({ mensaje: "Tarea eliminada correctamente", proyecto });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar tarea", error });
  }
};

// Filtrar tareas por estado o vencimiento (solo del usuario logueado)
exports.filtrarTareas = async (req, res) => {
  const { estado, vencidas } = req.query;
  try {
    const proyectos = await Proyecto.find({ usuario: req.usuario.id });
    let tareasFiltradas = [];

    proyectos.forEach(p => {
      const tareas = p.tareas.filter(t => {
        let cumple = true;

        if (estado) {
          if (estado === 'Completado') cumple = t.completado;
          else if (estado === 'Pendiente') cumple = !t.completado;
        }

        if (vencidas === 'true') {
          const hoy = new Date();
          if (new Date(t.fechaEntrega) >= hoy) cumple = false;
        }

        return cumple;
      });

      tareasFiltradas.push(...tareas);
    });

    res.status(200).json(tareasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al filtrar tareas', error });
  }
};
