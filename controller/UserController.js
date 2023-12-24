const User = require("../module/UserModel");
const bcrypt = require("bcrypt");
const path = require("path");

const Registers = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        message: "User Name is already Created",
        status: false,
        response_code: 201,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        message: "Email is already Created",
        status: false,
        response_code: 201,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.json({
      status: true,
      user,
      response_code: 200,
      message: "User Create Succesfully...",
    });
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (!emailCheck) {
      res.json({
        message: "Incorrect Email Id..",
        response_code: 201,
        status: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, emailCheck.password);
    if (!isPasswordValid) {
      res.json({
        message: "Incorrect Password..",
        response_code: 201,
        status: false,
      });
    }
    delete emailCheck.password;
    return res.json({
      message: "User Login Succesfully",
      status: true,
      data: emailCheck,
      response_code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      user.avatarImage = `/uploads/${req.file.filename}`;
      await user.save();
    }

    res.json({
      response_code: 200,
      message: "Profile image updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const userList = async (req, res, next) => {
  try {
    const _id=req.body
    // console.log(_id._id);
    const user = await User.find({});
    console.log(!user.includes(_id._id),"kjdshjkhd");
    res.json({
      user: user,
      message: "user get Successfully",
      response_code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const userFind = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const user = await User.findById({_id:userId});
    res.json({
      user:user,
      message:"user get Successfully",
      response_code:200
    })
  } catch (err) {
    next(err);
  }
};

module.exports = { Login, Registers, uploadImage, userList, userFind };
