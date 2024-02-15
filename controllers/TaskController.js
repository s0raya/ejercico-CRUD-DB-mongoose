const Task = require('../models/Task.js');

const TaskController = {
    async create(req,res) {
        try {
            const task = await Task.create({...req.body, completed: false});
            await task.save();
            res.status(201).json(task);
    
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "There was a problem trying to create a task" });
        }
    },

    async getTasks(req,res) {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "There was a problem trying to find tasks" });
        }
    },

    async getTaskById(req,res) {
        try {
            const id = req.params._id;
            const task = await Task.findById(id)
            res.status(201).json(task);
        } catch (error) {
            console.log(error)
        }
    },

    async markCompletedTask(req,res){
        try {
            const id = req.params._id;
            const task = await Task.findByIdAndUpdate(id, {completed: true}, {new: true});
            res.json(task);
            
        } catch (error) {
            console.log(error)
        }
    },

    async changeTitle(req,res) {
        try {
            const id = req.params._id;
            const title = req.body.title;
            const task = await Task.findOneAndUpdate(id, {title}, {new: true});
            res.json(task);
        } catch (error) {
            console.log(error)
        }
    },

    async deleteById(req,res) {
        try {
            const id = req.params._id;
            const task = await Task.findByIdAndDelete(id);
            res.json({message: 'Task deleted'});
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = TaskController;