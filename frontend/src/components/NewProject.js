import React, { useState } from "react";
import { Modal, Button} from "@mantine/core"; 
import { MantineReactTable } from "mantine-react-table"; // Import Mantine React Table
import "../styles/NewProject.css"; // Import your custom CSS
import { createProject } from "../service/api";

const NewProject = () => {
  const [formData, setFormData] = useState({
    tin_number: "",
    manager_name: "",
    company_name: "",
    phone_number: "",
    company_type: "",
    grade: "",
    organization: "",
    performance: "",
    remark: "",
    approved: false,
    projects: [
      {
        project_name: "",
        project_cost: "",
        year: "",
        categories: "",
        status: "unfinished",
        project_remark: "",
      },
    ],
  });

  const [projects, setProjects] = useState([]); // State to manage project data for the table
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle the modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name !== "project_name" &&
      name !== "project_cost" &&
      name !== "year" &&
      name !== "categories" &&
      name !== "status" &&
      name !== "project_remark"
    ) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        projects: [
          {
            ...formData.projects[0],
            [name]: value,
          },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        projects: [
          {
            ...formData.projects[0],
            year: parseInt(formData.projects[0].year, 10), // Convert year to an integer
          },
        ],
      };

      const response = await createProject(updatedFormData);
      console.log("Response from API:", response);

      // Update the project list for the table
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...updatedFormData, id: projects.length + 1 },
      ]);

      // Close the modal
      setIsModalOpen(false);

      // Reset the form
      setFormData({
        tin_number: "",
        manager_name: "",
        company_name: "",
        phone_number: "",
        company_type: "",
        grade: "",
        organization: "",
        performance: "",
        remark: "",
        approved: false,
        projects: [
          {
            project_name: "",
            project_cost: "",
            year: "",
            categories: "",
            status: "unfinished",
            project_remark: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Table columns definition
  const columns = [
    { accessor: "tin_number", header: "TIN Number" },
    { accessor: "manager_name", header: "Manager Name" },
    { accessor: "company_name", header: "Company Name" },
    { accessor: "projects[0].project_name", header: "Project Name" },
    { accessor: "projects[0].year", header: "Year" },
    { accessor: "projects[0].status", header: "Status" },
  ];

  return (
    <div className="new-project">
      {/* New Project Button */}
      <Button size={16}  onClick={() => setIsModalOpen(true)}>New Project</Button>

      {/* Modal for the Form */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="tin_number"
              placeholder="TIN Number"
              value={formData.tin_number}
              onChange={handleChange}
              required
            />
            <input
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              name="manager_name"
              placeholder="Manager Name"
              value={formData.manager_name}
              onChange={handleChange}
              required
            />
            <input
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
                    <select
                        name="company_type"
                        value={formData.company_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Company Type</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Construction">Construction</option>
                    </select>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Grade</option>
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                    </select>
            </div>
            <div className="form-row">
                    <select
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Organization</option>
                        <option value="Tech Group">Tech Group</option>
                    </select>
                    <select
                        name="performance"
                        value={formData.performance}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Performance</option>
                        <option value="Excellent performance in AI development and software solutions.">Excellent performance in AI development and software solutions.</option>
                    </select>
                </div>
                <textarea
                    name="remark"
                    placeholder="Additional Remarks"
                    value={formData.remark}
                    onChange={handleChange}
                ></textarea>
          <div className="form-row">
            <input
              name="project_name"
              placeholder="Project Name"
              value={formData.projects[0].project_name}
              onChange={handleChange}
              required
            />
            <input
              name="project_cost"
              placeholder="Project Cost"
              type="number"
              value={formData.projects[0].project_cost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              name="year"
              placeholder="Year"
              type="number"
              value={formData.projects[0].year}
              onChange={handleChange}
              required
            />
            <input
              name="categories"
              placeholder="Categories"
              value={formData.projects[0].categories}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="unfinished">Unfinished</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-row">
                    <textarea
                        name="project_remark"
                        placeholder="Project Remarks"
                        value={formData.project_remark}
                        onChange={handleChange}
                    ></textarea>
                </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>

      {/* Table for Projects */}
      <MantineReactTable columns={columns} data={projects} />
    </div>
  );
};

export default NewProject;
