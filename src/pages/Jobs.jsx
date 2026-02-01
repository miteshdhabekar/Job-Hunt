import React, { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/jobs")
      .then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h1>Latest Jobs</h1>

      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
          <h3>{job.title}</h3>
          <p><b>{job.companyName}</b> – {job.location}</p>
          <p>{job.description}</p>
          <a href={job.applyLink} target="_blank" rel="noreferrer">
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
