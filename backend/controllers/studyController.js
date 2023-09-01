const Study = require('../models/studyModel')
const mongoose = require('mongoose')


// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Study.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}
// get single task
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Study.findById(id)

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}


// create new task
const createTask = async (req, res) => {
    const {topic, description, link} = req.body

    let emptyFields = []

    if(!topic) {
        emptyFields.push('topic')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(!link) {
        emptyFields.push('link')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    // add doc to db
    try {
        const task = await Study.create({topic, description, link})  
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})  

    }
}
// delete task
const deleteTask = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Study.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)

}

// update task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Study.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}