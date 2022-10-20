const express = require("express");
const router = express.Router();

// Methods

const {
    login
} =  require("../controllers/auth.controller");
  
// Validation Middleware
const {
    auth
} =  require("../middlewares/auth");  
  
router.route("/login").post(login);

module.exports = router;    