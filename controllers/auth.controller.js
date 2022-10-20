const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Errors
const { InvalidCredentials } = require("../utils/sequelizeError");

// Async handler
const asyncHandler = require("../middlewares/asyncHandler");

// Database
const db = require("../models/index");
const { Op } = require("sequelize");
const { invalid } = require("joi");

const User = db.User;
const Token = db.Token;


exports.login = asyncHandler(async(req,res) => {
    // #swagger.tags = ['Autenticación']

    const {username, password} = req.body;
    let isValid = false;
    let token;


    const user = await User.findOne({
        where: {username: username}
    });

    if (!user) throw new InvalidCredentials("Invalid Credentials");

    isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new InvalidCredentials("Invalid Credentials");

    token = await generateToken({
        userId: user.id,
        username: user.username
    });

    res
        .status(200)
        .json({
            success: true,
            accessToken: `Bearer ${token.token}`,
            user: {
                userId: user.id,
                username: user.username
            }
        });
});

const generateToken = async (data) => {
    let token = jwt.sign({ userId: data.userId }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRATION
    });
  
    await Token.create({
      userId: data.userId,
      token: token
    });
  
    return { token: token };
};
  
