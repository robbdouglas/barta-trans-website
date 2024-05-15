import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [inputNews, setInputNews] = useState<string>("");
  const [inputJob, setInputJob] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<string>("admin");
  const [token, setToken] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

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
    if (userRole === "superuser") {
      fetchUsers();
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get("/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newsData = Array.isArray(response.data) ? response.data : [];
      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const jobsData = Array.isArray(response.data) ? response.data : [];
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = Array.isArray(response.data) ? response.data : [];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleAddNews = async () => {
    await axios.post(
      "/news",
      { title: inputNews, content: "News Content" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInputNews("");
    fetchNews();
  };

  const handleAddJob = async () => {
    await axios.post(
      "/jobs",
      { title: inputJob, description: "Job Description" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInputJob("");
    fetchJobs();
  };

  const handleDeleteNews = async (id: string) => {
    await axios.delete(`/news/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNews();
  };

  const handleDeleteJob = async (id: string) => {
    await axios.delete(`/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === "superuser") {
      await axios.post(
        "/users",
        { username: newUsername, role: newUserRole },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewUsername("");
      fetchUsers();
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>News</h2>
        <input
          value={inputNews}
          onChange={(e) => setInputNews(e.target.value)}
        />
        <button onClick={handleAddNews}>Add News</button>
        {news.map((item) => (
          <div key={item._id}>
            {item.title}{" "}
            <button onClick={() => handleDeleteNews(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Jobs</h2>
        <input value={inputJob} onChange={(e) => setInputJob(e.target.value)} />
        <button onClick={handleAddJob}>Add Job</button>
        {jobs.map((item) => (
          <div key={item._id}>
            {item.title}{" "}
            <button onClick={() => handleDeleteJob(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      {userRole === "superuser" && (
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
    </div>
  );
};

export default Dashboard;
