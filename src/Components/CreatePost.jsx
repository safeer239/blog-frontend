import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePost() {
    const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitTheData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem("user");
    let email = ""
    let username = "";

  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        username = parsedUser.name; // Extract name
        email = parsedUser.email; // Extract email
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  
    const newArticle = {
      title,
      paragraph,
      email: email, // Ensure this is correct
      author: username, // Now correctly retrieving the name
    };
  
    try {
      const res = await axios.post("https://blog-backend-6aha.onrender.com/post/createPost", newArticle);
      console.log(res.data);
      setMessage("✅ Article Added Successfully!");
      setTitle("");
      setParagraph("");
  
      // Redirect to home after a short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Some Error Occurred. Try Again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container card p-3 mt-4">
    <h2>Create an Article</h2>

    <form onSubmit={submitTheData}>
      {/* Title Input */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Content Input */}
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={paragraph}
          className="form-control"
          required
          rows="4"
          onChange={(e) => setParagraph(e.target.value)}
        />
      </div>

      {/* Display Message */}
      {message && <h4 className={`text-${message.includes("✅") ? "success" : "danger"} mt-3`}>{message}</h4>}

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
        {loading ? "Posting..." : "Post Article"}
      </button>
    </form>
  </div>
  )
}

export default CreatePost