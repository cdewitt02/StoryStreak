import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
    return (
        <div>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
};

export default CommentList;
