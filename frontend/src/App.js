import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import DataEntryForm from './components/DataEntryForm';
import Dashboard from './components/Dashboard';
import NewProject from './components/NewProject';
import Search from './components/Search';
import Users from './components/Admin/Users';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/" element={
                        <>
                            <h1>Work Relationship Management System</h1>
                            <LoginForm />
                            <DataEntryForm />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App; 