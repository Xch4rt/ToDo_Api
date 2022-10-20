const express = require("express");
const router = express.Router();

// Controllers methods
const { sendWelcomeMessage } = require("../controllers/welcome.Controller");

router.route("/").get(sendWelcomeMessage);

module.exports = router;