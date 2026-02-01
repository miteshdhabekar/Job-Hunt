import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


/* ================= STYLES ================= */

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddBtn = styled.button`
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #00d4ff;
    color: black;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    text-align: left;
  }

  th {
    color: #adadad;
    font-size: 0.85rem;
    text-transform: uppercase;
  }
`;

const DeleteBtn = styled.button`
  background: rgba(255, 71, 71, 0.1);
  color: #ff4747;
  border: 1px solid rgba(255, 71, 71, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #ff4747;
    color: white;
  }
`;

const EditBtn = styled.button`
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #00d4ff;
    color: black;
  }
`;


/* ================= COMPONENT ================= */

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const ADMIN_KEY = "DEVHUB_ADMIN_123";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/blogs/");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete blog?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/admin/blogs/${id}`,
        { headers: { "x-admin-key": ADMIN_KEY } }
      );

      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete blog");
    }
  };
  

  return (
    <>
      <PageTitle>Blogs</PageTitle>

      <ContentBox>
        <HeaderRow>
          <h3>Blogs</h3>
          <AddBtn onClick={() => navigate("/admin/add-blog")}>
            + Post Blog
          </AddBtn>
        </HeaderRow>

        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                  No blogs found
                </td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <EditBtn onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}>
                      Edit
                    </EditBtn>
                    <DeleteBtn onClick={() => deleteBlog(blog.id)}>
                      Delete
                    </DeleteBtn>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </ContentBox>
    </>
  );
};

export default AdminBlogs;
