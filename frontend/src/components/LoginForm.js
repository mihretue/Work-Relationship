import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/LoginForm.css"; // Import a CSS file for styling

const LoginForm = () => {
  const { loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:8000/api/login/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        const data = await response.json();
        const role = data.role;
        const accessToken = data.access;
        const refreshToken = data.refresh;

        localStorage.setItem("role", role);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (role === "team_leader") {
          navigate("/teamleader/dashboard");
        } else if (role === "director") {
          navigate("director/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Work Relationship Manager</h1>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <button type="button" className="login-button" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" className="login-button">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
