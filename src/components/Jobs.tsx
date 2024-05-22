import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

interface Job {
  _id: string;
  title: string;
  description: string;
  postedBy: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const port = import.meta.env.VITE_REACT_APP_PORT || 4200;
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${port}/jobs/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        console.error("Error: Expected array for jobs");
        setJobs([]); // Set empty array to avoid issues
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Set empty array to avoid issues
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Header />
      <section className="jobs-container">
        <h1>Jobs</h1>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default Jobs;
