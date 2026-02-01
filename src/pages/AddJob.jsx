import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();
  const ADMIN_KEY = "DEVHUB_ADMIN_123";

  const [job, setJob] = useState({
    title: "",
    companyName: "",
    companyShort: "",
    category: "IT",
    salary: "",
    location: "",
    description: "",
    tags: "",
    applyLink: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/api/admin/jobs",
      job,
      { headers: { "x-admin-key": ADMIN_KEY } }
    );

    navigate("/admin"); // 🔁 Back to dashboard
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Post New Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input name="companyShort" placeholder="Short Name" onChange={handleChange} required />

        <select name="category" onChange={handleChange}>
          <option value="IT">IT</option>
          <option value="Govt">Govt</option>
          <option value="Private">Private</option>
          <option value="Internship">Internship</option>
        </select>

        <input name="salary" placeholder="Salary" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
        />

        <input
          name="applyLink"
          placeholder="Apply Link"
          onChange={handleChange}
          required
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default AddJob;
