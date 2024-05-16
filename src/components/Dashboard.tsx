import React, { useState, useEffect } from 'react';

// Typdefinitionen für die News und Job Objekte
interface NewsItem {
  _id: string;
  title: string;
  content: string; 
}

interface JobItem {
  _id: string;
  title: string;
  description: string; 
}

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [inputNews, setInputNews] = useState<string>('');
  const [inputJob, setInputJob] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    fetchNews();
    fetchJobs();
  }, []);
  

  const fetchNews = async () => {
    const response = await fetch('/news');
    const data = await response.json();
    setNews(data);
  };

  const fetchJobs = async () => {
    const response = await fetch('/jobs');
    const data = await response.json();
    setJobs(data);
  };

  const handleAddNews = async () => {
    const response = await fetch('/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: inputNews, content: "News Content" })  // Beispiel-Content
    });
    if (response.ok) {
      setInputNews('');
      fetchNews();  
    }
  };

  const handleAddJob = async () => {
    const response = await fetch('/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: inputJob, description: "Job Description" }) 
    });
    if (response.ok) {
      setInputJob('');
      fetchJobs(); 
    }
  };

  const handleDeleteNews = async (id: string) => {
    const response = await fetch(`/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      fetchNews();  
    }
  };

  const handleDeleteJob = async (id: string) => {
    const response = await fetch(`/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      fetchJobs(); 
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>News</h2>
        <input value={inputNews} onChange={(e) => setInputNews(e.target.value)} />
        <button onClick={handleAddNews}>Add News</button>
        {news.map((item) => (
          <div key={item._id}>
            {item.title} <button onClick={() => handleDeleteNews(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Jobs</h2>
        <input value={inputJob} onChange={(e) => setInputJob(e.target.value)} />
        <button onClick={handleAddJob}>Add Job</button>
        {jobs.map((item) => (
          <div key={item._id}>
            {item.title} <button onClick={() => handleDeleteJob(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
