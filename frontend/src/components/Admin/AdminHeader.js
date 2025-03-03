import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Header.css'; // Corrected import path

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (if applicable)
        // Redirect to login page
        navigate('/');
    };

    return (
        <header className="header" style={{ backgroundColor: '#007bff', padding: '10px 20px', color: 'white' }}>
            <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>Work Relationship Manager</div>
            <nav className="nav">
                <Link to="/admin/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/admin/reports" className="nav-item">Reports</Link>
                <Link to="/admin/users" className="nav-item">Users</Link>
                <Link to="/admin/new-project" className="nav-item">New Project</Link>
                <button className="logout" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            </nav>
        </header>
    );
};

export default AdminHeader; 