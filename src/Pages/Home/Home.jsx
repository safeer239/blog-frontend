import React, { useEffect, useState } from "react";
import axios from "axios";
import PostsList from "../../Components/PostLists";
import spinner from "../../Assets/spinner.gif";
import "../Home/home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [ownPosts, setOwnPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [visibleOwnPosts, setVisibleOwnPosts] = useState(2);
  const [userEmail, setUserEmail] = useState(null); // Start as null

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser?._id) {
          setUserEmail(parsedUser._id);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [user]); // Effect runs only when `user` changes


  const isLoggedIn = localStorage.getItem("isLogged");

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("https://blog-backend-6aha.onrender.com/post/allPosts");
        setPosts(data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Fetch user's own posts (if logged in)
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      const fetchOwnPosts = async () => {
        try {
          const { data } = await axios.get(`https://blog-backend-6aha.onrender.com/post/userPosts/${userEmail}`);
          setOwnPosts(data.reverse());
        } catch (error) {
          console.error("Error fetching own posts:", error);
        }
      };

      fetchOwnPosts();
    }
  }, [isLoggedIn, userEmail]);

  return (
    <div className="container card">
      {/* Latest Posts */}
      <div className="card-header mt-2 mb-3">Latest Posts</div>
      {posts.length === 0 ? (
        <div className="spinner-parent">
          <img className="img-fluid spinner" src={spinner} alt="Loading..." />
        </div>
      ) : (
        posts.slice(0, visiblePosts).map((post) => <PostsList own={false} key={post._id} article={post} />)
      )}
      {visiblePosts < posts.length && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-3 mb-3" onClick={() => setVisiblePosts(visiblePosts + 3)}>
            Show More
          </button>
        </div>
      )}

      {/* User's Own Posts */}
      {isLoggedIn && (
        <>
          <div className="card-header mb-3">Your Posts</div>
          {ownPosts.length === 0 ? (
            <div className="d-flex justify-content-center pb-3">None to Show</div>
          ) : (
            ownPosts.slice(0, visibleOwnPosts).map((post) => <PostsList own={true} key={post._id} article={post} />)
          )}
          {visibleOwnPosts < ownPosts.length && (
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mt-3 mb-3" onClick={() => setVisibleOwnPosts(visibleOwnPosts + 3)}>
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
