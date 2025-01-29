import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/login.css";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change for both email and password
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginCheck = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
  
      try {
        const { data } = await axios.post("https://blog-backend-6aha.onrender.com/auth/login", formData);
        console.log('data: ', data);
  
        if (data) {
          localStorage.setItem("user", JSON.stringify(data)); // Store user data in localStorage
          localStorage.setItem("isLogged", true);
          navigate("/"); // Redirect to home page
        } else {
          setMessage("Incorrect email or password. Please try again.");
        }
      } catch (error) {
        setMessage("Login failed. Please check your credentials and try again.");
        console.error("Login Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate]
  );
  return (
    <div className="container">
      <div className="main">
        <div className="left"></div>
        <div className="right">
          <div className="banner">
            <h2>Login</h2>
          </div>
          <form className="container" onSubmit={loginCheck}>
            <div className="form-group">
              <label className="d-flex justify-content-start" htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                required
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
              <small className="form-text text-muted d-flex justify-content-start">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label className="d-flex justify-content-start" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            {message && <p className="text-danger">{message}</p>}
            <p className="d-flex justify-content-end mt-3">
              Don't have an account? <Link to="/signup">Sign up now!</Link>
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-primary mr-3 px-4" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {/* <Link to="/signup" className="btn btn-outline-primary">
                Sign Up
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login