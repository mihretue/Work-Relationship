import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Reports from './Reports'; // Import the Reports component

import {
    FaClipboardList,
    FaCheckCircle,
    FaExclamationCircle,
    FaTasks
} from 'react-icons/fa'; // Import icons

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showDetails, setShowDetails] = useState(null); // State to control visibility of project details

    useEffect(() => {
        // Fetch data from an API or local storage
        const fetchData = async () => {
            try {
                const response = await fetch('/api/projects'); // Replace with your API endpoint
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching data:", error); // Error handling
            }
        };

        fetchData();
    }, []);

    // Function to handle click on cards
    const handleCardClick = (category) => {
        setShowDetails(category); // Show details for the selected category
    };

    // Filtered projects based on category
    const filteredProjects = (status) => {
        return projects.filter((project) => project.status === status);
    };

    return (
        <div style={{ padding: '20px', marginTop: '20px' }}> {/* Adjusted layout without Sidebar */}
            {/* Header with navigation links */}
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Dashboard</h2>
                <div className="navigation">
                    <Link to="/admin/projects" style={{ marginRight: '20px' }}>Projects</Link>
                    <Link to="/admin/reports" style={{ marginRight: '20px' }}>Reports</Link>
                </div>
            </div>

            <Reports projects={projects} /> {/* Include the Reports component */}
            <div className="dashboard-content">
                <div className="card" onClick={() => handleCardClick('total')}>
                    <FaClipboardList className="card-icon" />
                    <h3>Total Projects</h3>
                    <p>{projects.length}</p>
                </div>
                <div className="card" onClick={() => handleCardClick('active')}>
                    <FaTasks className="card-icon" />
                    <h3>Active Projects</h3>
                    <p>{filteredProjects('active').length}</p>
                </div>
                <div className="card" onClick={() => handleCardClick('completed')}>
                    <FaCheckCircle className="card-icon" />
                    <h3>Completed Projects</h3>
                    <p>{filteredProjects('completed').length}</p>
                </div>
                <div className="card" onClick={() => handleCardClick('pending')}>
                    <FaExclamationCircle className="card-icon" />
                    <h3>Pending Projects</h3>
                    <p>{filteredProjects('pending').length}</p>
                </div>
            </div>

            {/* Conditional rendering for project details */}
            {showDetails && (
                <div className="project-details">
                    <h3>
                        {showDetails === 'total' && 'Total Projects'}
                        {showDetails === 'active' && 'Active Projects'}
                        {showDetails === 'completed' && 'Completed Projects'}
                        {showDetails === 'pending' && 'Pending Projects'}
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>TIN Number</th>
                                <th style={tableHeaderStyle}>Manager</th>
                                <th style={tableHeaderStyle}>Company</th>
                                <th style={tableHeaderStyle}>Phone</th>
                                <th style={tableHeaderStyle}>Project</th>
                                <th style={tableHeaderStyle}>Cost</th>
                                <th style={tableHeaderStyle}>Type</th>
                                <th style={tableHeaderStyle}>Grade</th>
                                <th style={tableHeaderStyle}>Organization</th>
                                <th style={tableHeaderStyle}>Performance</th>
                                <th style={tableHeaderStyle}>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(showDetails === 'total' ? projects : filteredProjects(showDetails)).map((project) => (
                                <tr key={project.id}>
                                    <td style={tableCellStyle}>{project.tinNumber}</td>
                                    <td style={tableCellStyle}>{project.managerName}</td>
                                    <td style={tableCellStyle}>{project.companyName}</td>
                                    <td style={tableCellStyle}>{project.phoneNumber}</td>
                                    <td style={tableCellStyle}>{project.projectName}</td>
                                    <td style={tableCellStyle}>{project.projectCost}</td>
                                    <td style={tableCellStyle}>{project.companyType}</td>
                                    <td style={tableCellStyle}>{project.grade}</td>
                                    <td style={tableCellStyle}>{project.organization}</td>
                                    <td style={tableCellStyle}>{project.performance}</td>
                                    <td style={tableCellStyle}>{project.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button style={{ marginTop: '20px' }} onClick={() => setShowDetails(null)}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
};

export default Dashboard;
