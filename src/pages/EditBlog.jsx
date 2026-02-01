import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ADMIN_KEY = "DEVHUB_ADMIN_123";

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    coverImage: ""
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await axios.get(
  `http://localhost:8080/api/admin/blogs/`,
  { headers: { "x-admin-key": ADMIN_KEY } }
);
    setBlog(res.data);
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const updateBlog = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8080/api/admin/blogs/${id}`,
      blog,
      { headers: { "x-admin-key": ADMIN_KEY } }
    );

    navigate("/admin");
  };

  return (
    <form onSubmit={updateBlog}>
      <h2>Edit Blog</h2>

      <input name="title" value={blog.title} onChange={handleChange} />
      <input name="author" value={blog.author} onChange={handleChange} />
      <input name="tags" value={blog.tags} onChange={handleChange} />
      <input name="coverImage" value={blog.coverImage} onChange={handleChange} />
      <textarea name="content" value={blog.content} onChange={handleChange} />

      <button type="submit">Update Blog</button>
    </form>
  );
};

export default EditBlog;
