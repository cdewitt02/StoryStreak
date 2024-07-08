// import React, { useState, useRef } from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";
// import "../styles/Write.css";
// import api from "../api";

// function Write() {
//   // Initialize state for title, excerpt, and content
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const customToolbarOptions = [
//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//     [{ direction: "rtl" }], // text direction
//     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ align: [] }],
//     ["clean"], // remove formatting button
//   ];

//   const modules = {
//     toolbar: customToolbarOptions,
//   };

//   // Initialize Quill editors
//   const { quill: quillContent, quillRef: quillRefContent } = useQuill({
//     modules,
//   });

//   // Update state with Quill content
//   const handlePost = async () => {
//     const isConfirmed = window.confirm("Are you sure you want share this post");

//     if (isConfirmed) {
//       const contentContent = quillContent ? quillContent.root.innerHTML : "";

//       setContent(contentContent);

//       try {
//         const res = await api.post("/api/posts/create/", {
//           title: title,
//           content: contentContent,
//         });
//       } catch (error) {
//         alert(error);
//       } finally {
//         quillContent.setContents([{ insert: "\n" }]);
//         setTitle("")
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <header>Create Post</header>
//       <form className="form">
//         <div className="field-container">
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-input"
//           />
//         </div>
//         <div className="field-container">
//           <label>Content:</label>
//           <div
//             ref={quillRefContent}
//             className="quill-editor"
//             style={{ height: 500, width: 1200 }}
//           />
//         </div>
//         <button type="button" className="post-button" onClick={handlePost}>
//           Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Write;

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Write.css";
import api from "../api";

function Write() {
  // Initialize state for title and content
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const handlePost = async () => {
    const isConfirmed = window.confirm("Are you sure you want to share this post");

    if (isConfirmed) {
      try {
        const res = await api.post("/api/posts/create/", {
          title: title,
          content: content,
        });
        // Handle response if needed
      } catch (error) {
        alert(error);
      } finally {
        setContent("");
        setTitle("");
      }
    }
  };

  return (
    <div className="form-container">
      <header>Create Post</header>
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
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            // className="quill-editor"
            style={{ height: 500, width: 1200 }}
          />
        </div>
        <button type="button" className="post-button" onClick={handlePost}>
          Post
        </button>
      </form>
    </div>
  );
}

export default Write;
