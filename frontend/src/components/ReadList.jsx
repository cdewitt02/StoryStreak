import React from "react";
import "../styles/ReadList.css"; // Styles for the component (create this file)
import { Link } from "react-router-dom";

function ReadList({ posts, onSelectPost }) {
  return (
    <div className="read-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="read-item"
          onClick={() => onSelectPost(post)}
        >
          <h2>{post.title}</h2>
          <h4>Author: {post.author_name}</h4>
        </div>
      ))}
    </div>
  );
}

export default ReadList;
