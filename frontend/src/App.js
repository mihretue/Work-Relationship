import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EmployeeDashboard from "./components/Teamleader/TeamleaderDashboard";
import DirectorDashboard from "./components/Director/DirectorDashboard"
// Other dashboard components...
import Projects from "./components/Director/Projects";
import Reports from "./components/Director/Reports"
import UserSignup from "./components/Admin/Users"
import NewProject from "./components/Teamleader/NewProject";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/teamleader/dashboard" element={<EmployeeDashboard />} />
        <Route path="/director/dashboard" element={<DirectorDashboard/>}/>
        <Route path="/teamleader/projects" element={<NewProject/>}/>
      </Routes>
      <Routes>
      <Route path="/admin/projects" element={<Projects />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/users" element={<UserSignup/>} />
      </Routes>
    </Router>
  );
};

export default App;
