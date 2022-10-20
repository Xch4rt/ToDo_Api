const jwt = require('jsonwebtoken');

const config = process.env;

// Errors
const { BadRequest, InvalidCredentials } = require("../utils/sequelizeError");

// Async handler
const asyncHandler = require("../middlewares/asyncHandler");

// Database
const db = require("../models/index");
const { Op } = require("sequelize");

const User = db.User;
const Token = db.Token;

const verifyToken = asyncHandler(async(req,res,next) => {
    const token = req.header('x-auth-token') || req.body.token || req.query.token;

    const {token_user, isAvaliable} = await Token.findOne({where: {userId: req.body.userId}, attributes: ['token', 'isAvaliable']});
    if (!token) throw new BadRequest("No token provided");

    const decoded = jwt.verify(token, config.JWT_KEY);
    req.user = decoded;

    if (!req.user) throw new InvalidCredentials("Invalid Credentials");

    next();
}
);

module.exports = verifyToken;