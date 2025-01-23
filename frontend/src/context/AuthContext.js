import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // To handle error messages
    const [loading, setLoading] = useState(false); // For loading state during API call

    const login = async (username, password) => {
        try {
            setLoading(true); // Start loading
            setError(null); // Reset any previous error

            // Make the API call to login
            const response = await axios.post('/api/login/', {
                username,
                password,
            });

            // Extract the token and user role
            const { access_token, refresh_token, ui_route, role } = response.data;

            // Save tokens to local storage for persistence
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            // Set user info to context
            setUser({ username, role });

            // Return the UI route based on the user's role
            return { success: true, ui_route };

        } catch (err) {
            setError("Invalid username or password"); // Show error if login fails
            return { success: false, message: err.response?.data?.non_field_errors || "Login failed" };
        } finally {
            setLoading(false); // Stop loading after API call
        }
    };

    const logout = () => {
        // Remove tokens from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Reset user state
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
