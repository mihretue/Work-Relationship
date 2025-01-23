// routes.js
export const roleRoutes = {
    admin: [
      { path: "admin/dashboard", component: "Admin/Dashboard" },
      { path: "admin/user", component: "Admin/User" },
    ],
    teamleader: [
      { path: "teamleader/dashboard", component: "Teamleader/Dashboard" },
      { path: "teamleader/new-project", component: "Teamleader/NewProject" },
      { path: "teamleader/report", component: "Teamleader/Report" },
    ],
    director: [
      { path: "director/dashboard", component: "Director/Dashboard" },
      { path: "director/report", component: "Director/Report" },
      { path: "director/project", component: "Director/Project" },
    ],
  };
  