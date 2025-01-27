import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import '../styles/LoginPage.css'; // Import a CSS file for styling

const LoginPage = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with your actual login logic
        if (role === 'admin' && username === 'admin' && password === 'password') {
            navigate('/admin/dashboard'); // Redirect to the admin dashboard
        } else if (role === 'teamleader' && username === 'teamleader' && password === 'password') {
            navigate('/teamleader/dashboard'); // Redirect to the team leader dashboard
        } else if (role === 'director' && username === 'director' && password === 'password') {
            navigate('/director/dashboard'); // Redirect to the director dashboard
        } else {
            alert('Invalid credentials');
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
                    <select value={role} onChange={(e) => setRole(e.target.value)} required className="login-input">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teamleader">Team Leader</option>
                        <option value="director">Director</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 