const express = require('express');
const router = express.Router();

// Methods

const {getTask, createTask} = require("../controllers/task.controller");


router.route("/getTask/").get(getTask);
router.route("/").post(createTask);

module.exports = router;