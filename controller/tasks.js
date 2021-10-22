const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper ( async (req, res) => {
      // get all task 
        const tasks = await Task.find({})
        res.status(200).json({tasks})
});

const getTask = asyncWrapper ( async (req, res, next) => {
    // get a single task 
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID})
    res.status(200).json({task })
    
    // content to return if there is no task with the params id 
    if(!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
});

const createTask = asyncWrapper (async (req, res) => {
    // create a single task 
        const task = await Task.create(req.body)
        res.status(201).json({task})
});


const updateTask = asyncWrapper ( async (req, res) => {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndUpdate({
            _id: taskID,
        }, req.body, 
        // adding options 
        {new: true,
        runValidators: true})
        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({task})
});

const deleteTask = asyncWrapper ( async (req, res) => {
    // delete a single task 
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID})
        
        // content to return if there is no task with the params id 
        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
            }
        res.status(200).json({task})  
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}