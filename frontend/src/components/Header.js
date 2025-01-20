import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import the CSS for styling

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Work Relationship Manager</div>
            <nav className="nav">
                <Link to="/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/new-project" className="nav-item">New Project</Link>
                <Link to="/search" className="nav-item">Search</Link>
                <Link to="/users" className="nav-item">Users</Link>
                <button className="logout">Logout</button>
            </nav>
        </header>
    );
};

export default Header; 