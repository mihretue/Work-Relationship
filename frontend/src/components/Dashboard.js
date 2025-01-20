import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaCheckCircle, FaExclamationCircle, FaTasks } from 'react-icons/fa'; // Import icons

const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch data from an API or local storage
        const fetchData = async () => {
            const response = await fetch('/api/projects'); // Replace with your API endpoint
            const data = await response.json();
            setProjects(data);
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-content">
                <div className="card">
                    <FaClipboardList className="card-icon" />
                    <h3>Total Projects</h3>
                    <p>{projects.length}</p>
                </div>
                <div className="card">
                    <FaTasks className="card-icon" />
                    <h3>Active Projects</h3>
                    <p>5</p> {/* Replace with dynamic data */}
                </div>
                <div className="card">
                    <FaCheckCircle className="card-icon" />
                    <h3>Completed Projects</h3>
                    <p>3</p> {/* Replace with dynamic data */}
                </div>
                <div className="card">
                    <FaExclamationCircle className="card-icon" />
                    <h3>Pending Projects</h3>
                    <p>2</p> {/* Replace with dynamic data */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 