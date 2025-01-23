import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../service/api";
const LoginForm = () => {
  const { login, error, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate instead of useHistory
const [formData, setFormData ]= useState({
  username: '',
  password: '',
})
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData)

    if (response.success) {
      // Redirect to the UI route based on the user role
      navigate(response.ui_route); // Use navigate for redirecting
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <button type="button" disabled>
          Loading...
        </button>
      ) : (
        <button type="submit">Login</button>
      )}
    </form>
  );
};

export default LoginForm;
