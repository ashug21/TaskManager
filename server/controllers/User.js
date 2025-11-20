const User = require("../models/User");
const bcrypt = require("bcryptjs");


const SignUpUser = async (req, res) => {
    try {
      const { name, email, password, reenterpassword } = req.body;
  
      if (!name || !email || !password || !reenterpassword) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      }
  
      if (password !== reenterpassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: "Email already in use." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      return res.status(201).json({ success: true, message: "User registered successfully." });
  
    } catch (err) {
  
      // THIS FIXES EVERYTHING
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Email already in use."
        });
      }
  
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
  


const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }


    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    res.status(200).json({ success: true, message: "Logged in successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  SignUpUser,
  LoginUser
};
