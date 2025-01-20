import React, { useState } from 'react';
import '../styles/NewProject.css'; // Import the CSS for styling

const NewProject = () => {
    const [formData, setFormData] = useState({
        tinNumber: '',
        companyName: '',
        managerName: '',
        phoneNumber: '',
        projectName: '',
        projectCost: '',
        companyType: '',
        grade: '',
        organization: '',
        performance: '',
        year: '',
        category: '',
        remark: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Project Data:', formData);
    };

    return (
        <div className="new-project">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input
                        name="tinNumber"
                        placeholder="TIN Number"
                        value={formData.tinNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <input
                        name="managerName"
                        placeholder="Manager Name"
                        value={formData.managerName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <input
                        name="projectName"
                        placeholder="Project Name"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="projectCost"
                        placeholder="Project Cost"
                        type="number"
                        value={formData.projectCost}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Company Type</option>
                        <option value="contractor">Contractor</option>
                        <option value="consultant">Consultant</option>
                        <option value="unions">Unions</option>
                    </select>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                    </select>
                </div>
                <div className="form-row">
                    <select
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Organization</option>
                        <option value="design and construction">Design and Construction</option>
                    </select>
                    <select
                        name="performance"
                        value={formData.performance}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Performance</option>
                        <option value="pending">Pending</option>
                        <option value="LG Gold">LG Gold</option>
                        <option value="G">G</option>
                        <option value="LY">LY</option>
                        <option value="Y">Y</option>
                        <option value="LR">LR</option>
                        <option value="R Black">R Black</option>
                    </select>
                </div>
                <div className="form-row">
                    <input
                        name="year"
                        placeholder="Year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Categories</option>
                        <option value="Category A">Category A</option>
                        <option value="Category B">Category B</option>
                    </select>
                </div>
                <textarea
                    name="remark"
                    placeholder="Additional Remarks"
                    value={formData.remark}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default NewProject; 