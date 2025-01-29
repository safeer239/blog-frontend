import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../Assets/logo.png"

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged");
    if (loggedIn) {
      setIsLogged(true);
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user); // Convert string back to object
        setUsername(user.name); // Extract and set the name
        console.log("username: ", user.name);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    setIsLogged(false);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info mb-3">
    <div className="container-fluid">
      {/* Navigation Links */}
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
          <img src= {logo} height={50} alt="" />
           
          </Link>
        </li>
      </ul>

      {/* User Section */}
      {isLogged ? (
        <div className="d-flex align-items-center">
          <span className="me-3">Welcome {username}</span>
          <Link className="btn btn-light me-3" to="/create">
            + Add Article
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="btn btn-secondary" to="/login">
          Login/Sign Up
        </Link>
      )}
    </div>
  </nav>
  )
}

export default Navbar