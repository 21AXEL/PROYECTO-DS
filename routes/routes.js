const express = require('express'); 
const router = express.Router();
const controlador = require('../controllers/controller');
const verificarToken = require('../middlewares/verificarToken');

// Middleware global para proteger todas las rutas
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   - name: Proyectos
 *   - name: Tareas
 */

/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get('/proyectos', controlador.obtenerProyectos);

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proyecto'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 */
router.post('/proyectos', controlador.crearProyecto);

/**
 * @swagger
 * /api/proyectos/{id}/tareas:
 *   post:
 *     summary: Agregar tarea a un proyecto
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       201:
 *         description: Tarea agregada correctamente
 */
router.post('/proyectos/:id/tareas', controlador.agregarTarea);

/**
 * @swagger
 * /api/proyectos/{id}/tareas/{tareaId}:
 *   put:
 *     summary: Actualizar tarea de un proyecto
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: tareaId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 */
router.put('/proyectos/:id/tareas/:tareaId', controlador.actualizarTarea);

/**
 * @swagger
 * /api/proyectos/{id}/tareas/{tareaId}:
 *   delete:
 *     summary: Eliminar una tarea de un proyecto
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: tareaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 */
router.delete('/proyectos/:id/tareas/:tareaId', controlador.eliminarTarea);

/**
 * @swagger
 * /api/tareas/filtrar:
 *   get:
 *     summary: Filtrar tareas por estado o vencimiento
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [Completado, Pendiente]
 *       - in: query
 *         name: vencidas
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas
 */
router.get('/tareas/filtrar', controlador.filtrarTareas);

module.exports = router;
