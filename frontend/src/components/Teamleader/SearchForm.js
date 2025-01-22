import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [tin, setTin] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(tin);
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="Search by TIN" onChange={(e) => setTin(e.target.value)} required />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm; 