const express = require('express');
const router = express.Router();

// Methods

const {getTask, createTask, updateTask, deleteTask} = require("../controllers/task.controller");


router.route("/getTask/").get(getTask);
router.route("/updateTask/").put(updateTask); 
router.route("/deleteTask/").delete(deleteTask);
router.route("/").post(createTask);

module.exports = router;