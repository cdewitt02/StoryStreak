// import React from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css"; // Add css for snow theme

// function Write() {
//   const { quill, quillRef } = useQuill();

//   // Insert Image(selected by user) to quill
//   const insertToEditor = (url) => {
//     const range = quill.getSelection();
//     quill.insertEmbed(range.index, "image", url);
//   };

//   // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
//   const saveToServer = async (file) => {
//     const body = new FormData();
//     body.append("file", file);

//     const res = await fetch("Your Image Server URL", { method: "POST", body });
//     insertToEditor(res.uploadedImageUrl);
//   };

//   // Open Dialog to select Image File
//   const selectLocalImage = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = () => {
//       const file = input.files[0];
//       saveToServer(file);
//     };
//   };

//   React.useEffect(() => {
//     if (quill) {
//       // Add custom handler for Image Upload
//       quill.getModule("toolbar").addHandler("image", selectLocalImage);
//     }
//   }, [quill]);

//   return (
//     <div style={{ width: 800, height: 300, border: "1px solid lightgray" }}>
//       <div ref={quillRef} />
//     </div>
//   );
// }

// export default Write;

import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

function Write() {
  const { quill, quillRef } = useQuill();
  const [editorHtml, setEditorHtml] = useState(""); // State to store editor content

  // Handle "Post" button click
  const handlePost = async () => {
    // Example endpoint URL on your backend
    const endpoint = "https://your-backend-api.com/post-content";
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editorHtml }), // Sending editor content to backend
      });

      if (response.ok) {
        console.log("Content posted successfully!");
        // Optionally, you can clear the editor content after posting
        setEditorHtml("");
      } else {
        console.error("Failed to post content:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting content:", error);
    }
  };

  return (
    <div>
      <div style={{ width: 1000, height: 800, border: "1px solid lightgray" }}>
        <div ref={quillRef} />
      </div>
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default Write;
