import React, { useState } from "react";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterpassword, setReEnterPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // FRONTEND VALIDATION
    if (!name.trim()) return toast.error("Name is required");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Enter a valid email address");
  
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
  
    if (password !== reenterpassword) return toast.error("Passwords do not match");
  
    // API CALL
    try {
      const { data } = await api.post("/user/signup", {
        name,
        email,
        password,
        reenterpassword,
      });
  
      if (data.success) {
        toast.success("User created successfully", { duration: 3000 });
  
        setName("");
        setEmail("");
        setPassword("");
        setReEnterPassword("");
  
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    
      console.log("FULL ERROR RESPONSE →", error.response);
    
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error or network issue");
      }
    }
  };
  
  
  
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="signup-wrapper">
        <div className="signup-box">
          <h2 className="signup-heading">Create Account</h2>
          <p className="signup-subtext">Join now to start managing your tasks.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={(e) => setReEnterPassword(e.target.value)}
                value={reenterpassword}
                type="password"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <p className="signup-login">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
