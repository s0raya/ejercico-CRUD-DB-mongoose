const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');


//POST /create: Endpoint para crear una tarea.
router.post('/create', async(req,res) => {
    try {
        const taskTitle = req.body.title;
        const taskCompleted = req.body.completed;
        const task = new Task( { title: taskTitle, completed: taskCompleted});
        await task.save();
        res.status(201).json(task);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "There was a problem trying to create a task" });
    }
});


//GET /: Endpoint para traer todas las tareas.
router.get('/', async(req,res) => {
    try {
        const tasks = await Task.find();
        res.status(201).json(tasks);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "There was a problem trying to find tasks" });
    }
})

// GET /id/:_id: Endpoint para buscar tarea por id.
router.get('/id/:_id', async(req,res) => {
    try {
        const id = req.params;
        const task = await Task.findById(id)
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
    }
});

// PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
router.put('/markAsCompleted/:_id', async(req,res) => {
    try {
        const id = req.params;
        const task = await Task.findByIdAndUpdate(id, {completed: true}, {new: true});
        res.status(201).json(task);
        
    } catch (error) {
        console.log(error)
    }
});

//PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo “completed” desde este endpoint, sino solo, el título.
router.put('/id/:_id', async(req,res) => {
    try {
        const id = req.params;
        const title = req.body.title;
        const task = await Task.findOneAndUpdate(id, {title: title}, {new: true});
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
    }
});

//DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete('/id/:_id', async(req,res) => {
    try {
        const id = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(201).json({message: 'Task deleted'});
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;



