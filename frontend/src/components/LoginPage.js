import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login

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
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#007bff', width: '100%', padding: '20px', color: 'white', textAlign: 'center', position: 'fixed', top: 0 }}>
                <h2>Login</h2>
            </div>
            <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', height: 'auto', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: '50px' }}>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ margin: '10px 0', padding: '15px', width: '100%', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}>
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
                        style={{ margin: '10px 0', padding: '15px', width: '100%', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ margin: '10px 0', padding: '15px', width: '100%', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ padding: '15px 30px', marginTop: '10px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 