import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css'; // Corrected import path

const Header = () => {
    return (
        <header className="header" style={{ backgroundColor: '#007bff', padding: '10px 20px', color: 'white' }}>
            <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>Work Relationship Manager</div>
            <nav className="nav">
                <Link to="/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/new-project" className="nav-item">New Project</Link>
                <Link to="/search" className="nav-item">Search</Link>
                <Link to="/users" className="nav-item">Users</Link>
                <Link to="/admin-login" className="nav-item">Admin Login</Link>
                <Link to="/reports" className="nav-item">Reports</Link>
                <button className="logout" style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            </nav>
        </header>
    );
};

export default Header; 