const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
// const bcrypt = require('bcryptjs') // to convert password fom string to hash. This is moved inside the model
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  //const { name, email, password } = req.body;

  // if(!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  //  } // Without the trhow we can still get 500 error taken care by the mongoose validations but we want more meaningful errors

  const user = await User.create({ ...req.body });
  const token = jwt.sign({userId: user._id, name:user.name}, 'jwtSecret', {
    expiresIn: '30d',
  })
  res.status(StatusCodes.CREATED).json({ name: user.getName(), token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
