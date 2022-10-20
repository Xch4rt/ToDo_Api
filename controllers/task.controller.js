// Async Handler
const asyncHandler = require('../middlewares/asyncHandler');

// Errors
const {BadRequest} = require('../utils/sequelizeError');
// Database
const db = require('../models/index');

const {Op} = require('sequelize');

const ToDo = db.ToDo;
const Task = db.Task;

exports.getTask = asyncHandler((req,res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para obtener todas las tareas de un ToDo'
    const {userId} = req.body;
    
    res.status(200)
        .send(Task.findAll({include:{model:ToDo,as:'todo', required: true}}));
});

exports.updateTask = asyncHandler(async(req,res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para actualizar una tarea'
    const {taskId, name} = req.body;

    const task = await Task.update({name: name},{where:{id:taskId}});

    res.status(200).json({
        success: true,
        msg: "Task Actualizado con exito",
        data: task
    });
});

exports.deleteTask = asyncHandler(async(req,res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.parameters['taskId'] = {description: 'Task Id'}
    // #swagger.description = 'Endpoint para eliminar un task'
    const {taskId} = req.body;

    await Task.update({status:false},{where:{id:taskId}});
    res.status(200).json({
        success: true,
        msg: "Task Eliminado con exito"
    });
});

exports.createTask = asyncHandler(async(req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Endpoint para crear una nueva tarea'
    const {todoId, name} = req.body;

    const task = await db.Task.create({
        todoId,
        name,
        isFinished: false
    });

    res.status(201).json({
        success: true,
        msg: "Task Creado con exito",
        data: task
    });
});