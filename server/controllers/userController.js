const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
require("dotenv").config();
process.env["DEBUG"] = "jsonwebtoken";

//register a new user
const registerUser = async (req, res) => {
  try {
    const { userName, password, role, permission } = req.body;

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user object
    const newUser = new User({
      userName,
      password: hashedPassword,
      role,
      permission,
    });

    //save the user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login and generating JWT token
const loginUser = async (userName, password) => {
  try {
    const user = await User.findOne({ userName });
    //if no user found, throw an error
    if (!user) {
      throw new Error("Invalid Details!");
    }

    //check for password validity
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid Details!");
    }

    //generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: user.role,
        permission: user.permission,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    return { token, role: user.role, permission: user.permission };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser };
