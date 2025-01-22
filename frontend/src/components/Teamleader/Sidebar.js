import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaComments, FaUser } from 'react-icons/fa'; // Import icons
import './Sidebar.css'; // Ensure this path is correct

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/tasks"><FaTasks /> My Tasks</Link>
                </li>
                <li>
                    <Link to="/chat"><FaComments /> Chat</Link>
                </li>
                <li>
                    <Link to="/profile"><FaUser /> My Profile</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar; 