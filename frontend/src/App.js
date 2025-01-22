import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Teamleader/Header";
import LoginForm from "./components/Teamleader/LoginForm";
import DataEntryForm from "./components/Teamleader/DataEntryForm";
import Dashboard from "./components/Teamleader/Dashboard";
import NewProject from "./components/Teamleader/NewProject";
import Search from "./components/Teamleader/Search";
import Users from "./components/Admin/Users";
import Chat from './components/Teamleader/Chat';
import MyProfile from './components/Teamleader/MyProfile';
import AdminLogin from "./components/Admin/AdminLogin";
import Projects from "./components/Teamleader/Projects";
import Reports from "./components/Teamleader/Reports";

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <h1>Work Relationship Management System</h1>
                                <LoginForm />
                                <DataEntryForm />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
