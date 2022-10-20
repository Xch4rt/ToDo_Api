// Async Handler
const asyncHandler = require('../middlewares/asyncHandler');

// Errors
const {BadRequest} = require('../utils/sequelizeError');
// Database
const db = require('../models/index');
const {Op} = require('sequelize');

const ToDo = db.ToDo;
const Task = db.Task;

exports.getTodoTask = asyncHandler(async(req,res) => {
    // #swagger.tags = ['ToDos']

    const {userId} = req.body;
    const data = await ToDo.findAll({where:{user_id:userId},include:{model:Task,as:'tasks', required: true}});
    res.status(200).json({
        success: true,
        data: data
    });
});

exports.getTodo = asyncHandler(async(req,res) => {
    // #swagger.tags = ['ToDos']

    const {userId} = req.body;
    const data = await ToDo.findAll({where:{user_id:userId}});
    res.status(200).json({
        success: true,
        data: data
    });
});


exports.updateTodo = asyncHandler(async(req,res) => {
    // #swagger.tags = ['ToDos']

    const {todoId, name} = req.body;

    const todo = await ToDo.update({name: name},{where:{id:todoId}});

    res.status(200).json({
        success: true,
        msg: "ToDo Actualizado con exito",
        data: todo
    });
});

exports.deleteTodo = asyncHandler(async(req,res) => {
    // #swagger.tags = ['ToDos']

    const {todoId} = req.body;

    const todo = await ToDo.update({status:false},{where:{id:todoId}});

    res.status(200).json({
        success: true,
        msg: "ToDo Eliminado con exito",
        data: todo
    });
});

exports.createTodo = asyncHandler(async(req, res) => {
    //#swagger.tags = ['ToDos']
    const {userId, name} = req.body;

    const todo = await db.ToDo.create({
        userId,
        name,
        isFinished: false
    });

    res.status(201).json({
        success: true,
        msg: "ToDo Creado con exito",
        data: todo
    });
})