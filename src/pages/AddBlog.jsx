import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const ADMIN_KEY = "DEVHUB_ADMIN_123";

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    coverImage: ""
  });

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `http://localhost:8080/api/admin/blogs/`,
      blog,
      {
        headers: {
          "x-admin-key": ADMIN_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    navigate("/admin"); // or "/admin/blogs"
  } catch (error) {
    alert("Failed to publish blog");
    console.error(
      error.response ? error.response.data : error.message
    );
  }
};


  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }}>
      <h2>Create Blog</h2>

      <form onSubmit={submit}>
        <input
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={blog.author}
          onChange={handleChange}
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={blog.tags}
          onChange={handleChange}
        />

        <input
          name="coverImage"
          placeholder="Cover Image URL"
          value={blog.coverImage}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Blog content..."
          rows="6"
          value={blog.content}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
