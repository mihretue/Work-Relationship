import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EmployeeDashboard from "./components/Teamleader/TeamleaderDashboard";
import DirectorDashboard from "./components/Director/DirectorDashboard"
// Other dashboard components...
import Projects from "./components/Director/Projects";
import Reports from "./components/Director/Reports";
import Header from './components/Teamleader/Header';
import NewProject from './components/Teamleader/NewProject';
import Search from './components/Teamleader/Search';
import AdminHeader from './components/Admin/AdminHeader';
import Users from './components/Admin/Users';
import AdminNewProject from './components/Admin/AdminNewProject';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<><AdminHeader /><Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="new-project" element={<AdminNewProject />} />
        </Routes></>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/teamleader/dashboard" element={<EmployeeDashboard />} />
        <Route path="/teamleader/new-project" element={<NewProject />} />
        <Route path="/teamleader/search" element={<Search />} />
        <Route path="/teamleader/reports" element={<Reports />} />
        <Route path="/director/dashboard" element={<DirectorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
