const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
// const bcrypt = require('bcryptjs') // to convert password fom string to hash. This is moved inside the model
//const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  //const { name, email, password } = req.body;

  // if(!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  //  } // Without the trhow we can still get 500 error taken care by the mongoose validations but we want more meaningful errors

  const user = await User.create({ ...req.body });
  // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
  //   expiresIn: "30d",// 30 menas 30seconds but "30" means 30msand we want days so we day "30d"
  // }); //when the token is not part of the schema
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user: {name: user.name} , token });
};

const login = async (req, res) => {
const {email, password} = req.body;
if(!email || !password) {
  throw new BadRequestError("Please provide email and password")
}

const user = await User.findOne({email})
//compare password
if(!user) {
  throw new UnauthenticatedError('Invalid Credentials')
}

const token = user.createJWT();

res.status(StatusCodes.OK).json({user: {name:user.name}, token})
};

module.exports = { register, login };
