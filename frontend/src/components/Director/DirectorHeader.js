import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DirectorHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (if applicable)
        // Redirect to login page
        navigate('/');
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Work Relationship Manager</div>
            <nav style={{ display: 'flex', gap: '20px' }}>
                <Link to="/director/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Dashboard</Link>
                <Link to="/director/new-project" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>New Projects</Link>
                <Link to="/director/search" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Search</Link>
                <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>Logout</button>
            </nav>
        </header>
    );
};

export default DirectorHeader; 