import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/ReadDetail.css";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function ReadDetail() {
  const { slug } = useParams(); // Access the slug parameter from URL
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/posts/${slug}/`);
      console.log(response.data.comments);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  
  const handleLike = async () => {
    try {
      const response = await api.post(`/api/posts/${post.id}/like/`);
      await fetchPost();
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCommentCreated = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, newComment],
    }));

    console.log(newComment)
  };

  if (!post) {
    return <div>Loading...</div>; // Render a loading state while the post is being fetched
  }

  return (
    <div className="read-detail">
      <div className="content-container">
        <div className="read-det-container">
          <div className="header">
            <h1 className="title">{post.title}</h1>
            <h2 className="author">Author: {post.author_name}</h2>
            <h2 className="likes">Likes: {post.likes_count}</h2>
            <button onClick={handleLike} className="like-button">Like</button>
          </div>
          <div
            className="content"
            style={{ fontSize: "20px" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <div className="comments-section">
          <CommentForm postId={post.id} onCommentCreated={handleCommentCreated} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
}

export default ReadDetail;
