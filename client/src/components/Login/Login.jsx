import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/user/login", { email, password });

      if (data.success === true) {
        toast.success("Logged In Successfully");
        localStorage.setItem("userLoggedIn", "true");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Server error or connection failed");
      console.error("Login Error:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />

      <div className="login-wrapper">
        <div className="login-box">
          <h2 className="login-heading">Welcome Back 👋</h2>
          <p className="login-subtext">Please login to your account</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <p className="login-signup">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
