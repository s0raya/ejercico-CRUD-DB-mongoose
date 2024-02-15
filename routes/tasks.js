const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');
const TaskController = require('../controllers/TaskController.js')

//POST /create: Endpoint para crear una tarea.
router.post('/create', TaskController.create)

//GET /: Endpoint para traer todas las tareas.
router.get('/', TaskController.getTasks);

// GET /id/:_id: Endpoint para buscar tarea por id.
router.get('/id/:_id', TaskController.getTaskById);

// PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
router.put('/markAsCompleted/:_id', TaskController.markCompletedTask);

//PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo “completed” desde este endpoint, sino solo, el título.
router.put('/id/:_id', TaskController.changeTitle);

//DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete('/id/:_id', TaskController.deleteById);

module.exports = router;



