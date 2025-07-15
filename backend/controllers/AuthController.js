const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const userDoc = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(userDoc._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, userDoc });
  } catch (error) {
    console.error("Error while Signup :", error);
  }
};

module.exports.Login = async (req, res, next) => {
  console.log("in login route");

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        success: false,
        message: "Incorrect email or password ",
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(201).json({
      user: { username: user.username, email: user.email },
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
