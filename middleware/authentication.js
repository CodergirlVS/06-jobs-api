const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(' ')[1];
  try {
    //jwt.verify is a method
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job routes

    // const user = User.findById(payload.id).select('-password') //select and remove the password
    // req.user = user

    req.user = { userId: payload.userId, name: payload.name };
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authenticaton invalid");
  }
};
//this file protects the routes and the users can only see their jobs and not others 
module.exports = auth