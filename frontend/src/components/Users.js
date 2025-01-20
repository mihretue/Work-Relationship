import React, { useState } from 'react';
import '../styles/Users.css'; // Import the CSS for styling

const Users = () => {
    const [userData, setUserData] = useState({
        name: '',
        role: '',
        email: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle user addition logic here
        console.log('User Data:', userData);
    };

    return (
        <div className="users">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="User Name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="director">Director</option>
                    <option value="groupLeader">Group Leader</option>
                </select>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Users; 