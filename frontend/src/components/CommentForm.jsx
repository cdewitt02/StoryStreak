// CommentForm.js
import React, { useState } from 'react';
import api from "../api";
import "../styles/CommentForm.css";

const CommentForm = ({ postId, onCommentCreated }) => {
    const [content, setContent] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/comments/create/', {
                post: postId,
                content: content,
            });
            onCommentCreated(response.data);
            setContent('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit" className='button'>Post Comment</button>
        </form>
      );
};

export default CommentForm;
