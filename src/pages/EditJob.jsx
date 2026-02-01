import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`http://localhost:8080/api/jobs`)
      .then(res => {
        const found = res.data.find(j => j.id === Number(id));
        if (found) setJob(found);
      });
  }, [id]);

  const handleChange = e => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8080/api/admin/jobs/${id}`,
      job,
      { headers: { "x-admin-key": ADMIN_KEY } }
    );

    navigate("/admin");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={job.title} onChange={handleChange} />
        <input name="companyName" value={job.companyName} onChange={handleChange} />
        <input name="companyShort" value={job.companyShort} onChange={handleChange} />

        <select name="category" value={job.category} onChange={handleChange}>
          <option value="IT">IT</option>
          <option value="Govt">Govt</option>
          <option value="Private">Private</option>
          <option value="Internship">Internship</option>
        </select>

        <input name="salary" value={job.salary} onChange={handleChange} />
        <input name="location" value={job.location} onChange={handleChange} />
        <input name="tags" value={job.tags} onChange={handleChange} />

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
        />

        <input
          name="applyLink"
          value={job.applyLink}
          onChange={handleChange}
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
