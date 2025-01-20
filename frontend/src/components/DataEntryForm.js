import React, { useState } from 'react';

const DataEntryForm = () => {
    const [formData, setFormData] = useState({
        tin: '',
        managerName: '',
        projectName: '',
        projectCost: '',
        companyName: '',
        performanceGrade: '',
        year: '',
        category: '',
        remark: ''
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to the backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="tin" placeholder="TIN Number" onChange={handleChange} required />
            <input name="managerName" placeholder="Manager Name" onChange={handleChange} required />
            <input name="projectName" placeholder="Project Name" onChange={handleChange} required />
            <input name="projectCost" placeholder="Project Cost" type="number" onChange={handleChange} required />
            <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
            <select name="performanceGrade" onChange={handleChange} required>
                <option value="">Select Performance Grade</option>
                <option value="LG Gold">LG Gold</option>
                <option value="G">G</option>
                <option value="LY">LY</option>
                <option value="Y">Y</option>
                <option value="LR">LR</option>
                <option value="R">R</option>
                <option value="Black">Black</option>
            </select>
            <input name="year" placeholder="Year" type="number" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} required />
            <textarea name="remark" placeholder="Additional Remarks" onChange={handleChange}></textarea>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DataEntryForm; 