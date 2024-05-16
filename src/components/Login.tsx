import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importiere useNavigate

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Erstelle eine Instanz von useNavigate

  const port = import.meta.env.VITE_REACT_APP_PORT; 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`http://localhost:${port}/users/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); // Stelle sicher, dass der Token-Name hier und in deiner ProtectedRoute übereinstimmt
      localStorage.setItem("role", response.data.role);
      alert("Login successful!");
      if (response.data.token) {
        navigate("/dashboard"); // Verwende navigate anstelle von window.location.href
      }
    } catch (err) {
      setError("Login failed. Please check your username and password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
