import React,{ useState} from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate} from 'react-router-dom';



const UserLoggedIn = () => toast.success("Logged In Successfully");

const Login = () => {

  const navigate = useNavigate();

      const [email , setEmail] = useState("");
      const [password , setPassword] = useState("");

      const handleLogin = async (e) => {
        e.preventDefault();
      
        const res = await fetch("http://localhost:9000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      
        try{
        const data = await res.json();
        if (data.success) {
          toast.success("Logged In Successfully");
          localStorage.setItem("userLoggedIn", "true");
          navigate("/");
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      } catch (err) {
        toast.error("Server error");
        console.error(err);
      }
  
      setEmail("");
      setPassword("");
      };
      

  return (
    <div>
      <Navbar/>
<div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-heading">Welcome Back 👋</h2>
        <p className="login-subtext">Please login to your account</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" />
          </div>

          <button className="login-btn">
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
