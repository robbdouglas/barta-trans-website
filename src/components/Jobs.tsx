import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

interface Job {
  _id: string;
  title: string;
  description: string;
  postedBy: string;
}

// Styled Components für Spinner
const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const Bounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2.0s infinite ease-in-out;
`;

const Bounce2 = styled(Bounce1)`
  animation-delay: -1.0s;
`;

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Lade-Status
  const port = import.meta.env.VITE_REACT_APP_PORT || 4200;
  const token = localStorage.getItem("token");
  const { i18n } = useTranslation();

  const fetchJobs = async () => {
    setLoading(true); // Setze den Lade-Status auf true, bevor die Anfrage gestartet wird
    try {
      const response = await axios.get(`${port}/jobs/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lang: i18n.language } // Sprache an die Backend-Anfrage anhängen
      });
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        console.error("Error: Expected array for jobs");
        setJobs([]); // Setze ein leeres Array, um Probleme zu vermeiden
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Setze ein leeres Array, um Probleme zu vermeiden
    } finally {
      setLoading(false); // Setze den Lade-Status auf false, wenn die Anfrage abgeschlossen ist
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [i18n.language]); // Lade die Jobs erneut, wenn sich die Sprache ändert

  return (
    <div>
      <Header />
      <section className="jobs-container">
        <h1>Jobs</h1>
        {loading ? (
          <SpinnerContainer>
            <Bounce1 />
            <Bounce2 />
          </SpinnerContainer>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id}>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Jobs;
