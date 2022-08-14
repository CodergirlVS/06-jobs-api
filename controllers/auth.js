const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs') // to convert password fom string to hash.


const register = async (req, res) => {
  const {name, email, password} = req.body

//create password hash
  const salt = await bcrypt.genSalt(10) //random bytes
  const hashedPassword = await bcrypt.hash(password, salt)

  const tempUser = {name, email, password:hashedPassword}


  // if(!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  //  } // Without the trhow we can still get 500 error taken care by the mongoose validations but we want more meaningful errors


  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
