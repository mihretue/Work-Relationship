import React, { useState, useEffect } from 'react';
import '../../styles/Search.css'; // Corrected import path
import { SearchByTin } from '../../service/api';
import { showErrorNotification } from '../../common/notifications';
const Search = () => {
    const [tinNumber, setTinNumber] = useState(''); // State for TIN number
    const [filteredProjects, setFilteredProjects] = useState([]); // State for search results
    const [projects, setProjects] = useState([]);

    
    useEffect(() => {
        console.log("Filtered Projects Updated:", filteredProjects);
    }, [filteredProjects]);

    const handleChange = (e) => {
        setTinNumber(e.target.value); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const result = await SearchByTin(tinNumber);
            console.log("results",result)
            if (result) {
                setFilteredProjects([result]); 
                console.log("Filtered Projects State:", [result]);
            } else {
                
                showErrorNotification("No matching records found.")
                setFilteredProjects([]);
            }
          } catch (error) {
            console.error("Error during search:", error);
            
            showErrorNotification("An error occurred while searching. Please try again.")
          }
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
                                {filteredProjects.map((project) =>
                                    project.projects.map((proj, index) => (
                                        <tr key={`${project.id}-${index}`}>
                                            <td>{project.tin_number}</td>
                                            <td>{project.manager_name}</td>
                                            <td>{project.company_name}</td>
                                            <td>{project.phone_number}</td>
                                            <td>{proj.project_name}</td> {/* Show each project separately */}
                                            <td>{proj.project_cost}</td>
                                            <td>{project.company_type}</td>
                                            <td>{project.grade}</td>
                                            <td>{project.organization}</td>
                                            <td>{project.performance}</td>
                                            <td>{proj.categories}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default Search;
