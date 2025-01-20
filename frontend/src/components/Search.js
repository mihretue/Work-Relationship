import React, { useState } from 'react';
import '../styles/Search.css'; // Import the CSS for styling

const Search = () => {
    const [tinNumber, setTinNumber] = useState(''); // State for TIN number

    const handleChange = (e) => {
        setTinNumber(e.target.value); // Update TIN number state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here
        console.log('Searching for TIN Number:', tinNumber);
        // You can add your search logic here, e.g., API call
    };

    return (
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
    );
};

export default Search; 