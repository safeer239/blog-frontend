import React, { useState } from "react";
import axios from "axios";
import "../Register/register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const { data } = await axios.post("https://blog-backend-6aha.onrender.com/auth/register", formData);
  
      if (data) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("username", formData.name); // Corrected key from "username"
        localStorage.setItem("id", data.id);
        navigate("/");
      } else {
        setMessage("User with this email already exists. Try Again!");
      }
    } catch (error) {
      setMessage("Signup failed. Please try again later.");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <div className="main">
        <div className="left"></div>
        <div className="right">
          <div className="banner">
            <h2>Sign Up</h2>
          </div>
          <form onSubmit={submitData}>
            <div className="form-group mb-2">
              <label className="d-flex justify-content-start" htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group mb-2">
              <label className="d-flex justify-content-start " htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label className="d-flex justify-content-start" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
            </div>
            {message && <p className="text-danger">{message}</p>}
            <p className="text-end mt-3">
              Already have an account? <Link to="/login">Login now!</Link>
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              {/* <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register