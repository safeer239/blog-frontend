import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import spinner from "../Assets/spinner.gif";
import "../Pages/Home/home.css";

function Post() {
    const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://blog-backend-6aha.onrender.com/post/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setParagraph(res.data.paragraph);
        setDate(new Date(res.data.createdAt).toLocaleString());
        setAuthor(res.data.author);
        setComments(res.data.comment || []);    
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Convert string to object
        setCommentAuthor(parsedUser.name); // Store only the name
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const commentAdd = async (e) => {
    e.preventDefault();
    setCommentLoading(true);
    setMessage("");

    const newComment = { comment: message, author: commentAuthor };

    try {
      await axios.put(`https://blog-backend-6aha.onrender.com/post/addComment/${id}`, newComment);
      setComments((prevComments) => [...prevComments, newComment]); // Update UI immediately
      setMessage("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("❌ Failed to add comment. Try again.");
    } finally {
      setCommentLoading(false);
    }
  };
  return (
    <div className="container card">
    {loading ? (
      <div className="spinner-parent">
        <img className="spinner" src={spinner} alt="Loading..." />
      </div>
    ) : (
      <div className="card mt-3 p-2">
        <h1 className="card-title">{title}</h1>
        <p>{paragraph}</p>
        <h5>By: {author}</h5>
        <p>Published on: {date}</p>

        <Link className="btn btn-primary mb-3" to="/">
          Back to Home
        </Link>

        {/* Comments Section */}
        <div>
          <h3>Comments:</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="d-flex">
                <h5>{comment.author}: </h5>
                <p className="ml-2">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        {/* Comment Input */}
        {localStorage.getItem("isLogged") ? (
          <form onSubmit={commentAdd}>
            <input
              className="form-control"
              value={message}
              required
              placeholder="Add a comment..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary mt-2" type="submit" disabled={commentLoading}>
              {commentLoading ? "Posting..." : "Comment"}
            </button>
          </form>
        ) : (
          <div className="d-flex justify-content-center pb-3 text-danger">
            Login to Comment
          </div>
        )}
      </div>
    )}
  </div>
  )
}

export default Post