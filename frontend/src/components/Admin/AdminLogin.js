import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './AdminLogin.css'; // Optional: Create a CSS file for styling

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your actual login logic
        if (username === 'admin' && password === 'password') {
            // Simulate successful login
            navigate('/dashboard'); // Redirect to the dashboard
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin; 