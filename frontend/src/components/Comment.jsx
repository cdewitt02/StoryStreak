// Comment.js
import React from 'react';
import "../styles/Comment.css";

const Comment = ({ comment }) => {
  const { author, content, created_at } = comment;

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{author}</span>
        <span className="comment-date">{new Date(created_at).toLocaleDateString()}</span>
      </div>
      <div className="comment-content">{content}</div>
    </div>
  );
};

export default Comment;
