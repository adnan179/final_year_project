const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
require("dotenv").config();
process.env["DEBUG"] = "jsonwebtoken";

//login and generating JWT token
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    //if no user found, throw an error
    if (!user) {
      throw new Error("Invalid user!");
    }

    if (password !== user.password) {
      throw new Error("Invalid Details!");
    }

    //generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return { token, role: user.role };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = loginUser;
