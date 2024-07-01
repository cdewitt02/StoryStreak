import React, { useState, useEffect } from "react";
import ReadList from "../components/ReadList";
// import "../styles/Write.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [streak, setStreak] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/user/`);
        console.log(response.data);
        setStreak(response.data.streak);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    console.log(post);
    localStorage.setItem("post", post);
    navigate(`/update/${post.slug}`);
  };

  return (
    <div className="container">
      <h1 className="title">My Posts</h1>
      <h2 className="title">Current Post Streak: {streak} </h2>
      <ReadList posts={posts} onSelectPost={handleSelectPost} />
    </div>
  );
}

export default MyPosts;
