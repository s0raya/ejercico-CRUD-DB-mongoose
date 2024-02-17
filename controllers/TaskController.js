const Task = require('../models/Task.js');

const TaskController = {
    async create(req,res) {
        try {
            const task = await Task.create({...req.body, completed: false});
            res.status(201).send({ message: "Task successfully created", task });
    
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
            const task = await Task.findById(req.params._id)
            res.status(201).json(task);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "There was a problem with the task with _id number: " +
                    req.params._id,
            });
        }
    },

    async markCompletedTask(req,res){
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, {completed: true}, {new: true});
            res.send({ message: "Task successfully updated", task });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "There was a problem trying to update the task with _id: " +
                    req.params._id,
            });
        }
    },

    async changeTitle(req,res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, req.body, {new: true});
            res.send({ message: "task successfully updated", task });
        } catch (error) {
            console.log(error)
        }
    },

    async deleteById(req,res) {
        try {
            const id = req.params._id;
            const task = await Task.findByIdAndDelete(id);
            res.send({ message: "task deleted", task });
        } catch (error) {
            console.log(error);
            res
            .status(500)
            .send({ message: "There was a problem trying to delete a task" });
        }
    }
}

module.exports = TaskController;