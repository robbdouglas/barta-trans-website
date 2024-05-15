import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  description: string;
  postedBy: string; // Passe diesen Typ entsprechend an, falls nötig
}

interface News {
  _id: string;
  title: string;
  content: string;
  author: string; // Passe diesen Typ entsprechend an, falls nötig
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [newsTitle, setNewsTitle] = useState<string>('');
  const [newsContent, setNewsContent] = useState<string>('');

  useEffect(() => {
    fetchJobs();
    fetchNews();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/jobs');
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        console.error('Error: Expected array for jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get('/news');
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        console.error('Error: Expected array for news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const addJob = async () => {
    try {
      const response = await axios.post('/jobs', {
        title: jobTitle,
        description: jobDescription,
      });
      if (response.data && response.data._id) {
        setJobs((prevJobs) => [...prevJobs, response.data]);
      }
      setJobTitle('');
      setJobDescription('');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const addNews = async () => {
    try {
      const response = await axios.post('/news', {
        title: newsTitle,
        content: newsContent,
      });
      if (response.data && response.data._id) {
        setNews((prevNews) => [...prevNews, response.data]);
      }
      setNewsTitle('');
      setNewsContent('');
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await axios.delete(`/news/${id}`);
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <h2>Jobs</h2>
      <ul>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
              {job.title}: {job.description}
              <button onClick={() => deleteJob(job._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No jobs available</li>
        )}
      </ul>
      <div>
        <h3>Add Job</h3>
        <input
          type="text"
          placeholder="Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button onClick={addJob}>Add Job</button>
      </div>

      <h2>News</h2>
      <ul>
        {Array.isArray(news) && news.length > 0 ? (
          news.map((newsItem) => (
            <li key={newsItem._id}>
              {newsItem.title}: {newsItem.content}
              <button onClick={() => deleteNews(newsItem._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No news available</li>
        )}
      </ul>
      <div>
        <h3>Add News</h3>
        <input
          type="text"
          placeholder="Title"
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
        />
        <button onClick={addNews}>Add News</button>
      </div>
    </div>
  );
};

export default Dashboard;
