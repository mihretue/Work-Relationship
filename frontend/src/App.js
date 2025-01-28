import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EmployeeDashboard from "./components/Teamleader/TeamleaderDashboard";

import DirectorDashboard from "./components/Director/DirectorDashboard";
import DirectorNewProject from "./components/Director/DirectorNewProject";
import DirectorSearch from "./components/Director/Search";
import DirectorHeader from "./components/Director/DirectorHeader";
import Header from './components/Teamleader/Header';
import NewProject from './components/Teamleader/NewProject';
import Search from './components/Teamleader/Search';
import AdminHeader from './components/Admin/AdminHeader';
import Users from './components/Admin/Users';
import AdminNewProject from './components/Admin/AdminNewProject';
import Reports from './components/Director/Reports'; // Ensure this path is correct
import Projects from "./components/Director/Projects";
import DirectorReport from "./components/Director/Reports"
const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={
          <>
            <AdminHeader />
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
              <Route path="new-project" element={<AdminNewProject />} />
            </Routes>
          </>
        } />
        <Route path="/teamleader/*" element={
          <>
            <Header />
            <Routes>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path="search" element={<Search />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </>
        } />
        <Route path="/director/*" element={
          <>
            <DirectorHeader />
            <Routes>
              <Route path="dashboard" element={<DirectorDashboard />} />
              <Route path="new-project" element={<DirectorNewProject />} />
              <Route path="search" element={<DirectorSearch />} />
              <Route path="new-projects/approve-projects" element={<Projects/>}/>
              <Route path="report" element={<DirectorReport />} />
            </Routes>
          </>
        } />

      </Routes>
    </Router>
  );
};

export default App;