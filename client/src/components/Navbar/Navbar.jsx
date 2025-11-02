import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div id="tm-navbar">
      <div id="tm-navbar-container">
       <Link className="linking" to="/"><h1 id="tm-logo">Task<span>Manager</span></h1></Link> 
        <div id="tm-links">
          <Link to="/">Home</Link>
          <Link to="/add-task">Add Task</Link>
          <Link to="/my-task">My Tasks</Link>
          <Link to="/my-analytics">Analytics</Link>

          {isLoggedIn ? (
            <button id="tm-login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button id="tm-login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
