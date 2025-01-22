import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password, role);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="contractor">Contractor</option>
        <option value="consultant">Consultant</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
