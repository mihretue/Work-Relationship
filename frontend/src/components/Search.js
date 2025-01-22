import React, { useState } from 'react';
import '../styles/Search.css'; // Import the CSS for styling

const Search = ({ projects }) => {
    const [tinNumber, setTinNumber] = useState(''); // State for TIN number
    const [filteredProjects, setFilteredProjects] = useState([]); // State for search results

    const handleChange = (e) => {
        setTinNumber(e.target.value); // Update TIN number state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter projects with the matching TIN number
        const matches = projects.filter(project => project.tinNumber === tinNumber);
        setFilteredProjects(matches); // Update state with matching results
    };

    return (
        <div className="search-container">
            <div className="search">
                <h2>Search by TIN Number</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter TIN Number"
                        value={tinNumber}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            {filteredProjects.length > 0 && (
                <div className="results">
                    <h3>Search Results</h3>
                    <div className="project-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>TIN Number</th>
                                    <th>Manager</th>
                                    <th>Company</th>
                                    <th>Phone</th>
                                    <th>Project</th>
                                    <th>Cost</th>
                                    <th>Type</th>
                                    <th>Grade</th>
                                    <th>Organization</th>
                                    <th>Performance</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.tinNumber}</td>
                                        <td>{project.managerName}</td>
                                        <td>{project.companyName}</td>
                                        <td>{project.phoneNumber}</td>
                                        <td>{project.projectName}</td>
                                        <td>{project.projectCost}</td>
                                        <td>{project.companyType}</td>
                                        <td>{project.grade}</td>
                                        <td>{project.organization}</td>
                                        <td>{project.performance}</td>
                                        <td>{project.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {filteredProjects.length === 0 && tinNumber && (
                <p className="no-results">No results found for TIN Number: {tinNumber}</p>
            )}
        </div>
    );
};

export default Search;
