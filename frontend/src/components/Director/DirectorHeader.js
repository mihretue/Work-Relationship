import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/DirectorHeader.css'; // Ensure this path is correct

const DirectorHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (if applicable)
        // Redirect to login page
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">Work Relationship Manager</div>
            <nav className="nav">
                <Link to="/director/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/director/new-project" className="nav-item">New Projects</Link>
                <Link to="/director/search" className="nav-item">Search</Link>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default DirectorHeader; 