const express = require('express');
const router = express.Router();

// Methods

const {getTodoTask, createTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller");


router.route("/getTodoTask").get(getTodoTask);
router.route("/getTodo").post(getTodo);
router.route("/updateTodo").put(updateTodo);	
router.route("/deleteTodo").delete(deleteTodo);
router.route("/").post(createTodo);

module.exports = router;