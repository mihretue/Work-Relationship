import React, { useState } from 'react';
import '../../styles/Users.css'; // Import the CSS for styling
import { createUser } from '../../service/api';
const Users = () => {
    const [userData, setUserData] = useState({
        username: '',
        role: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await createUser(userData)
            setUserData({
                username: "",
                email: "",
                password: "",
            });
        }catch(error){
            console.error("Error",error)
        }
    };

    return (
        <div className="users">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="User Name"
                    value={userData.username}
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
                    <option value="team_leader">Group Leader</option>
                </select>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Users; 