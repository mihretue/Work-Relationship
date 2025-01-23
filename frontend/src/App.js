import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EmployeeDashboard from "./components/Teamleader/TeamleaderDashboard";
import DirectorDashboard from "./components/Director/DirectorDashboard"
// Other dashboard components...
import Projects from "./components/Director/Projects";
import Reports from "./components/Director/Reports"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/director/dashboard" element={<DirectorDashboard/>}/>
        {/* Add more role-based routes */}
      </Routes>
      <Routes>
      <Route path="/admin/projects" element={<Projects />} />
      <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;
