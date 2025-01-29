import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function PostLists({ article, own }) {
    const deletePost = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (!confirmDelete) return;
    
        try {
          const res = await axios.delete(`https://blog-backend-6aha.onrender.com/post/delete/${id}`);
          alert(res.data);
          window.location.reload(); // Refresh list after deletion
        } catch (err) {
          console.error("Error deleting post:", err);
          alert("❌ Failed to delete article. Try again.");
        }
      };
  return (
    <div className="card mt-1 card-body">
    <Link className="text-dark" to={`/post/${article._id}`}>
      <h2 className="card-title">{article.title}</h2>
    </Link>
    <p className="card-text">{article.paragraph}</p>
    <h5>By: {article.author}</h5>
    <p>Published on: {new Date(article.createdAt).toLocaleString()}</p>

    {own && (
      <div className="d-flex justify-content-between">
        <Link to={`/edit/${article._id}`} className="btn btn-outline-warning">
          Edit Article
        </Link>
        <button onClick={() => deletePost(article._id)} className="btn btn-outline-danger">
          Delete Article
        </button>
      </div>
    )}
  </div>
  )
}

export default PostLists