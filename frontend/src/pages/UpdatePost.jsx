import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Write.css";

function UpdatePost() {
  const { slug } = useParams(); // Access the slug parameter from URL
  const [post, setPost] = useState(null); // Changed to null for initial state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()

  const customToolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: customToolbarOptions,
  };

  // Initialize Quill editors
  const { quill: quillContent, quillRef: quillRefContent } = useQuill({
    modules,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/posts/${slug}/`);
        setPost(response.data); // Set the post data in state
        setTitle(response.data.title); // Set the title from post data
        setContent(response.data.content); // Set the content from post data
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (quillContent && post) {
      // Ensure Quill editor and post data are both loaded
      quillContent.root.innerHTML = post.content; // Set content in Quill editor
    }
  }, [quillContent, post]);
  const handleDelete = async () => {

    const isConfirmed = window.confirm("Are you sure you to delete this post");

    if (isConfirmed) {
      const contentContent = quillContent ? quillContent.root.innerHTML : "";

      setContent(contentContent);

      try {
        const res = await api.delete(`/api/posts/delete/${post.id}/`, {
        });
      } catch (error) {
        alert(error);
      } finally {
        navigate('/myposts')
      }
    };
}
  const handleUpdate = async () => {
    const isConfirmed = window.confirm("Are you sure you to update this post");

    if (isConfirmed) {
      const contentContent = quillContent ? quillContent.root.innerHTML : "";

      setContent(contentContent);

      try {
        const res = await api.patch(`/api/posts/update/${post.id}/`, {
          title: title,
          content: contentContent,
        });
      } catch (error) {
        alert(error);
      } finally {
      }
    }
  };
  return (
    <div className="form-container">
      <header>Edit Post</header>
      <form className="form">
        <div className="field-container">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-input"
          />
        </div>
        <div className="field-container">
          <label>Content:</label>
          <div
            ref={quillRefContent}
            className="quill-editor"
            style={{ height: 400 }}
          />
        </div>
        <button type="button" className="post-button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" className="post-button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
