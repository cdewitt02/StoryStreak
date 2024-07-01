import React, { useState, useEffect } from "react";
import ReadList from '../components/ReadList';
import "../styles/Read.css";
import api from "../api";
import ReadDetail from "./ReadDetail";
import {useNavigate} from "react-router-dom";


function Read() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts/");
        setPosts(response.data);
        console.log(response)

        console.log(posts)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    console.log(post)
    localStorage.setItem('post', post)
    navigate(`/read/${post.slug}`)
  };

  return (
    <div className="container">
      <h1 className="read-title">Posts</h1>
      <ReadList posts={posts} onSelectPost={handleSelectPost} />
      {selectedPost && (
        <ReadDetail post={selectedPost}/>
      )}
    </div>
  );
}

export default Read;
