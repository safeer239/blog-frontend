import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
    const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch post data when component mounts
  useEffect(() => {
    axios
      .get(`https://blog-backend-6aha.onrender.com/post/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setParagraph(res.data.paragraph);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setMessage("❌ Failed to fetch post. Try again.");
      });
  }, [id]);

  const submitTheData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    // Retrieve stored session data with fallback values
    const storedUser = localStorage.getItem("user");
    let email = ""
    let author = "";

    if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          author = parsedUser.name; // Extract name
          email = parsedUser.email; // Extract email
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
  
    const updatedArticle = {
      title,
      paragraph,
      email,
      author,
    };
  
    try {
      const res = await axios.put(`https://blog-backend-6aha.onrender.com/post/update/${id}`, updatedArticle);
      console.log(res.data);
      setMessage("✅ Article Updated Successfully!");
  
      // Redirect to home after a short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Error updating post:", err);
      setMessage("❌ Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container p-3 card mt-4">
    <h2>Edit Article</h2>

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
          required
          value={paragraph}
          className="form-control"
          rows="4"
          onChange={(e) => setParagraph(e.target.value)}
        />
      </div>

      {/* Display Message */}
      {message && <h4 className={`text-${message.includes("✅") ? "success" : "danger"} mt-3`}>{message}</h4>}

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
        {loading ? "Updating..." : "Update Article"}
      </button>
    </form>
  </div>
  )
}

export default EditPost
