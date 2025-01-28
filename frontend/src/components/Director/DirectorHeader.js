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
           <header className="header" style={{ backgroundColor: '#007bff', padding: '10px 20px', color: 'white' }}>
               <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>Work Relationship Manager</div>
               <nav className="nav">
                   <Link to="/director/dashboard" className="nav-item">Dashboard</Link>
                   <Link to="/director/new-project" className="nav-item">New Project</Link>
                   <Link to="/director/search" className="nav-item">Search</Link>
                   <Link to="/director/reports" className="nav-item">Reports</Link>
                   <button className="logout" onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
               </nav>
           </header>
       );
   };

export default DirectorHeader; 