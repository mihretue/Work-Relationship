import React, { useState, useEffect } from "react";
import { Select, Table, Box } from "@mantine/core";

const DynamicTableWithYearFilter = ({ companyData }) => {
  const [filteredData, setFilteredData] = useState(companyData);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");

  // Extract unique years from the projects data
  useEffect(() => {
    const uniqueYears = Array.from(
      new Set(
        companyData.flatMap((company) =>
          company.projects ? company.projects.map((project) => project.year) : []
        )
      )
    ).filter(Boolean); // Exclude null/undefined years

    setYears(["All", ...uniqueYears.sort((a, b) => b - a)]); // Sort years descending
  }, [companyData]);

  // Handle year selection and filter data
  const handleYearChange = (year) => {
    setSelectedYear(year);

    if (year === "All") {
      setFilteredData(companyData);
    } else {
      const filtered = companyData.map((company) => {
        const filteredProjects = company.projects?.filter(
          (project) => project.year === year
        );
        return filteredProjects && filteredProjects.length > 0
          ? { ...company, projects: filteredProjects }
          : null;
      }).filter(Boolean); // Remove companies without matching projects

      setFilteredData(filtered);
    }
  };

  return (
    <Box>
      {/* Dropdown for Year Selection */}
      <Box mb="lg">
        <Select
          label="Filter by Year"
          placeholder="Select a year"
          data={years.map((year) => ({ value: year, label: year }))}
          value={selectedYear}
          onChange={(value) => handleYearChange(value)}
          withinPortal
        />
      </Box>

      {/* Dynamic Table */}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Number of Projects</th>
            <th>Manager Name</th>
            <th>Total Costs</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((company) => {
            const totalCosts = company.projects
              .map((project) => parseFloat(project.project_cost))
              .filter((cost) => !isNaN(cost))
              .reduce((acc, cost) => acc + cost, 0);

            return (
              <tr key={company.id}>
                <td>{company.company_name}</td>
                <td>{company.projects ? company.projects.length : 0}</td>
                <td>{company.manager_name}</td>
                <td>{totalCosts.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default DynamicTableWithYearFilter;
