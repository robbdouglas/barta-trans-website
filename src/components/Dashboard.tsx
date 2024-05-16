import React, { useState, useEffect } from "react";
import axios from "axios";


interface Job {
  _id: string;
  title: string;
  description: string;
  postedBy: string; // Adjust this type as needed
}

interface News {
  _id: string;
  title: string;
  content: string;
  author: string; // Adjust this type as needed
}

interface User {
  _id: string;
  username: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [newsTitle, setNewsTitle] = useState<string>("");
  const [newsContent, setNewsContent] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<string>("admin");
  const [token, setToken] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  const port = import.meta.env.REACT_APP_PORT || 4200;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    console.log("Retrieved from localStorage:", { storedToken, storedRole });
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      console.log(
        "Token and role set from localStorage:",
        storedToken,
        storedRole
      );
    } else {
      console.log("No token or role found in localStorage");
    }
    // fetchData(); // Not needed here
  }, []);

  useEffect(() => {
    console.log("Token or userRole changed:", token, userRole);
    if (token && userRole) {
      fetchData();
    }
  }, [token, userRole]);

  const fetchData = async () => {
    await fetchJobs();
    await fetchNews();
    if (userRole === "superuser") {
      await fetchUsers();
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/jobs/jobs`, {
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

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/news/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        console.error("Error: Expected array for news");
        setNews([]); // Set empty array to avoid issues
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]); // Set empty array to avoid issues
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/users/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addJob = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${port}/jobs/jobs`,
        {
          title: jobTitle,
          description: jobDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data._id) {
        setJobs((prevJobs) => [...prevJobs, response.data]);
      }
      setJobTitle("");
      setJobDescription("");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const addNews = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${port}/news/news`,
        {
          title: newsTitle,
          content: newsContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data._id) {
        setNews((prevNews) => [...prevNews, response.data]);
      }
      setNewsTitle("");
      setNewsContent("");
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`http://localhost:${port}/jobs/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await axios.delete(`http://localhost:${port}/news/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === "superuser") {
      try {
        await axios.post(
          `http://localhost:${port}/users/users`,
          {
            username: newUsername,
            role: newUserRole,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewUsername("");
        fetchUsers();
      } catch (error) {
        console.error("Error creating user:", error);
      }
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
      {userRole === "superuser" ? (
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
            <button type="submit" onClick={handleCreateUser}>
              Create User
            </button>
          </form>
          {users.map((user) => (
            <div key={user._id}>
              {user.username} - {user.role}
            </div>
          ))}
        </div>
      ) : (
        <p>User role is not superuser. Current role: {userRole}</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
