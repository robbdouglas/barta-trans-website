import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Typdefinitionen für die News, Job und User Objekte
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

interface UserItem {
  _id: string;
  username: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [inputNews, setInputNews] = useState<string>('');
  const [inputJob, setInputJob] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('admin');
  const [token, setToken] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
    fetchData();
  }, [token, userRole]);

  const fetchData = async () => {
    await fetchNews();
    await fetchJobs();
    if (userRole === 'superuser') {
      await fetchUsers();
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get('/news', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/jobs', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users', { headers: { Authorization: `Bearer ${token}` } });
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddNews = async () => {
    try {
      await axios.post('/news', { title: inputNews, content: "News Content" }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
      setInputNews('');
      fetchNews();
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const handleAddJob = async () => {
    try {
      await axios.post('/jobs', { title: inputJob, description: "Job Description" }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
      setInputJob('');
      fetchJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      await axios.delete(`/news/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'superuser') {
      try {
        await axios.post('/users', { username: newUsername, role: newUserRole }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
        setNewUsername('');
        fetchUsers();
      } catch (error) {
        console.error('Error creating user:', error);
      }
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
      {userRole === 'superuser' && (
        <div>
          <h2>Manage Users</h2>
          <form onSubmit={handleCreateUser}>
            <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" required />
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="superuser">Superuser</option>
            </select>
            <button type="submit">Create User</button>
          </form>
          {users.map(user => (
            <div key={user._id}>{user.username} - {user.role}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
