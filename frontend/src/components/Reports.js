import React from 'react';

const Reports = ({ projects }) => {
    return (
        <div>
            <h3>Reports</h3>
            {/* Render your reports based on the projects data */}
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.projectName} - {project.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reports; 