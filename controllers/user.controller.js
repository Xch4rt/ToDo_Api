const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// Async Handler
const asyncHandler = require('../middlewares/asyncHandler');

// Errors
const {BadRequest, InvalidCredentials, Conflict} = require('../utils/sequelizeError');
// Database
const db = require('../models/index');
const {Op} = require('sequelize');

const User = db.User;
const Token = db.Token;


exports.registerUser = asyncHandler(async(req,res,next) => {
    let salt = 5;
    let token;
    
    const {username, password} = req.body;

    // validando user input
    if (!username && !password) throw new BadRequest("Upss...");

    //verificar si el usuario existe
    const exist = await db.User.findOne({where: {username: username}});

    if (exist) throw new Conflict("Upss...");

    //password = await bcrypt.hash(password, salt);

    // Creando nuevo usuario
    const user = await db.User.create({
        username,
        password: await bcrypt.hash(password,salt)
    });


    // Creando token
    token = generateToken({
        userId: user.id,//await db.User.findOne({where: {username: username}, attributes:['id']}),
        username: user.username
    })
    

    res.status(201).json({
        success: true,
        accessToken: `Bearer ${token.token}`,
        user: {
            userId: user.id,
            username: username
        }
    })

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
  

