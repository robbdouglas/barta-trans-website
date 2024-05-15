import React, { useState, useEffect } from "react";
import axios from "axios";

interface Job {
// Typdefinitionen für die News, Job und User Objekte
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

interface User {
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
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    fetchNews();
    fetchJobs();
    if (userRole === 'superuser') {
      fetchUsers();
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:4200/jobs/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    const response = await axios.get('/news', { headers: { Authorization: `Bearer ${token}` } });
    setNews(response.data);
  };

  const fetchJobs = async () => {
    const response = await axios.get('/jobs', { headers: { Authorization: `Bearer ${token}` } });
    setJobs(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('/users', { headers: { Authorization: `Bearer ${token}` } });
    setUsers(response.data);
  };

  const handleAddNews = async () => {
    await axios.post('/news', { title: inputNews, content: "News Content" }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
    setInputNews('');
    fetchNews();
  };

  const handleAddJob = async () => {
    await axios.post('/jobs', { title: inputJob, description: "Job Description" }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
    setInputJob('');
    fetchJobs();
  };

  const handleDeleteNews = async (id: string) => {
    await axios.delete(`/news/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchNews();
  };

  const handleDeleteJob = async (id: string) => {
    await axios.delete(`/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchJobs();
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'superuser') {
      await axios.post('/users', { username: newUsername, role: newUserRole }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
      setNewUsername('');
      fetchUsers();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // redirect to welcome page
  };

  return (
    <div>
      <h1>Dashboard</h1>
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
      {userRole === 'superuser' && (
        <div>
          <h2>Manage Users</h2>
          <form onSubmit={handleCreateUser}>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="superuser">Superuser</option>
            </select>
            <button type="submit">Create User</button>
          </form>
          {users.map((user) => (
            <div key={user._id}>
              {user.username} - {user.role}
            </div>
          ))}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button> {/* Logout  */}
    </div>
  );
};

export default Dashboard;
