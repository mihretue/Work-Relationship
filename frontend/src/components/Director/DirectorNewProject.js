import React, { useState, useEffect } from "react";
import { Modal, Button, Select } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import "../../styles/NewProject.css";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllCompanies, createProject, forwardToDirector, StatusUpdate, editCompany, approveCompany } from "../../service/api";
import { FaCreativeCommonsNcJp } from "react-icons/fa";
import ProjectStatusUpdate from "./ProjectStatusUpdate";
import { showErrorNotification, showSuccessNotification, showAlertNotification } from "../../common/notifications";

const DirectorNewProject = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company for the modal
  // const [remark, setRemark] = useState(""); // Track remark input
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false); // State for the modal
  // const [selectedCompany, setSelectedCompany] = useState(null); 
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [formData, setFormData] = useState({
    tin_number: "",
    manager_name: "",
    company_name: "",
    phone_number: "",
    company_type: "",
    grade: "",
    organization: "",
    performance: "",

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

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false); // State for the view modal
  const [selectedProject, setSelectedProject] = useState(null); // State to hold the selected project data



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
      setData((prevProjects) => [
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
      showSuccessNotification("Created Successfully!")
      setRefetch(true)
    } catch (error) {
      console.error("Error creating project:", error);
      showErrorNotification(`Error creating project: ${error}`, "Error")
    }
  };

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const companyData = await getAllCompanies();
      console.log("Company DAta", companyData[1].projects)
      setData(companyData); // Set the fetched data
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tin_number: "",
      manager_name: "",
      company_name: "",
      phone_number: "",
      company_type: "",
      grade: "",
      organization: "",
      performance: "",

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
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };


  const handleView = (project) => {
    setSelectedProject(project); // Set the selected project data
    setViewModalOpen(true); // Open the view modal
  };

  const handleForward = (rowData) => {
    const { id } = rowData; // Extract the ID of the item to be forwarded
    //   setProjects((prevProjects) =>
    //     prevProjects.map((project) =>
    //         project.id === id ? { ...project, status: 'Forwarding...' } : project
    //     )
    // );
    forwardToDirector(
      id,
      (data) => {
        // alert("Project forwarded successfully!");
        showSuccessNotification("Project forwarded successfully!")
        console.log("Response Data:", data);
        setRefetch((prev) => !prev);
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id ? { ...row, forwarded_to_director: true } : row
          )
        );
      },
      (error) => {
        // Error callback
        console.error("Error forwarding project:", error);
        // alert(error.message || "Failed to forward project. Please try again.");
        showErrorNotification("Failed to forward project. Please try again." || error.message)
      }
    );
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false); // Close modal
    setSelectedCompany(null); // Clear selected company
    setStatus(""); // Reset status input
  };

  const handleStatus = (rowData) => {
    // Set the selected company for the status update
    console.log("Selected Row Data:", rowData)
    setSelectedCompany(rowData);
    setUpdateModalOpen(true); // Open the modal
  };
  const handleEditModal = (rowData) => {
    setSelectedCompany(rowData);
    setFormData({
      tin_number: rowData.tin_number,
      manager_name: rowData.manager_name,
      company_name: rowData.company_name,
      phone_number: rowData.phone_number,
      company_type: rowData.company_type,
      grade: rowData.grade,
      organization: rowData.organization,
      performance: rowData.performance,
      projects: [
        {
          project_name: rowData.projects[0].project_name,
          project_cost: rowData.projects[0].project_cost,
          year: rowData.projects[0].year,
          categories: rowData.projects[0].categories,
          status: rowData.projects[0].status,
          project_remark: rowData.projects[0].project_remark,
        },
      ],
    });
    setIsUpdateOpen(true);
  };
  const closeEditModal = () => {
    setIsUpdateOpen(false)
    setSelectedCompany(null)
    setStatus("")
  }
  const handleStatusUpdate = () => {
    if (!selectedCompany || !status) {
      showAlertNotification("Please select a status before updating.", "Warning");
      return;
    }
    const { id: companyId, projects } = selectedCompany;
    const [{ id: projectId }] = projects;

    console.log("Updating status for:", { companyId, projectId, status }); // Debugging log

    StatusUpdate(
      companyId,
      projectId,
      status,
      (data) => {
        console.log("Response Data:", data); // Debugging log
        showSuccessNotification("Project status updated successfully!", 'success');

        // Update the local state immediately
        setData((prevData) =>
          prevData.map((company) =>
            company.id === companyId
              ? {
                ...company,
                projects: company.projects.map((project) =>
                  project.id === projectId
                    ? { ...project, status } // Update the status
                    : project
                ),
              }
              : company
          )
        );

        closeUpdateModal(); // Close modal immediately after update
      },
      (error) => {
        console.error("Error updating project status:", error);
        showErrorNotification("Failed to update project status. Please try again." || error.message);
      }
    );
  };

  const handleEdit = () => {
    if (!selectedCompany) {
      showAlertNotification("Please select a Company before updating", 'Warning')
    }
    const { id: companyId } = selectedCompany;

    editCompany(
      companyId,
      (data) => {
        showAlertNotification("Company updated successfully!", "Warning")
        // alert("Company updated successfully!");
        console.log("Response Data:", data);
        setRefetch((prev) => !prev);
        closeModal()
      },
      (error) => {
        console.error("Error updating company:", error);
        // alert(error.message ||"Failed to updating company. Please try again.");
        showErrorNotification("Failed to updating company. Please try again.")
      }
    )
  }

  const handleApprove = async (id) => {
    try {
      const response = await approveCompany(id); // Call the API to approve the company
      if (response.status === 200) {
        showSuccessNotification("Company approved successfully!");
        setData((prevData) =>
          prevData.map((company) =>
            company.id === id ? { ...company, approved: true } : company
          )
        );
      }
    } catch (error) {
      console.error("Error approving company:", error);
      showErrorNotification("Failed to approve company. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedCompany(null);
    // setRemark("");
    setStatus("");
  };

  useEffect(() => {
    fetchCompanies()
  }, []);



  const flattenedProjects = data.reduce((acc, company) => {
    company.projects.forEach(project => {
      acc.push({
        ...company,
        project_name: project.project_name,
        project_status: project.status
      });
    });
    acc.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    return acc;
  }, []);

  const companyCol = [

    { accessorKey: "tin_number", header: "TIN Number" },
    { accessorKey: "manager_name", header: "Manager Name" },
    { accessorKey: "company_name", header: "Company Name" },
    {
      header: "Approval Status",
      accessorKey: "status",
      Cell: ({ row }) => {
        const { approved, forwarded_to_director } = row.original
        return (
          <span>
            {
              approved ?
                "Approved" : forwarded_to_director ? "Forwarded" : "Pending"
            }
          </span>
        )
      }

    },
    {
      header: "Project Status",
      accessorKey: 'projects',
      Cell: ({ row }) => {
        const { project_name, project_status } = row.original;
        return (
          <div>
            {project_status || "No status"}
          </div>
        );
      }


    },
    {
      header: "Actions",
      accessorKey: "actions",
      Cell: ({ row }) => {
        const { forwarded_to_director, approved } = row.original;
        const [isModalOpen, setModalOpen] = React.useState(false);
        return (
          <div className="action-buttons">
            <Button
              size="xs"
              color="blue"
              onClick={() => handleView(row.original)}
            >
              View
            </Button>
            {!forwarded_to_director &&
              (<><Button
                size="xs"
                color="red"
                onClick={() => handleDelete(row.original)}
              >
                Delete
              </Button>
                <Button
                  size="xs"
                  color="green"
                  onClick={() => handleForward(row.original)}
                >
                  Forward
                </Button>
                <Button
                  size="xs"
                  color="yellow"
                  onClick={() => handleEditModal(row.original)}
                >
                  Edit
                </Button>
              </>
              )}
            {
              approved && (
                <Button
                  size="xs"
                  color="blue"
                  onClick={() => handleStatus(row.original)}
                >
                  Update Status
                </Button>
              )
            }

          </div>
        )
      },
    },

  ];
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate('/director/new-projects/approve-projects')
  }
  return (
    <div className="new-project">
      <Button size={16} onClick={() => setIsModalOpen(true)}>
        New Project
      </Button>
      <Button size={16} style={{ marginLeft: '2rem', padding: '0.6rem', marginBottom: '3rem' }} onClick={handleNavigation}>
        Approve Projects
      </Button>
      <MantineReactTable
        columns={companyCol}
        data={flattenedProjects}
        state={{
          isLoading: false,
        }}
        enableSorting
        enablePagination
        enableGlobalFilter
      />
      <div style={{ marginTop: '2rem' }}>
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Project"
          size={890}
          styles={{
            content: {
              margin: '20px auto',
              marginTop: '60px'
            },
          }}
        >
          <form onSubmit={handleSubmit} style={{ marginTop: '6rem' }}>
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
                pattern="[0-9]{10}"
                title="Enter a valid phone number (10 digits)."
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
                <option value="contractor">Contractor</option>
                <option value="consultant">Consultant</option>
                <option value="unions">Unions</option>
              </select>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="">Select Grade</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
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
                <option value="design and construction bureau">design and construction bureau</option>
              </select>
              <select
                name="performance"
                value={formData.performance}
                onChange={handleChange}
                required
              >
                <option value="">Select Performance</option>
                <option value="pending">pending</option>
                <option value="LG GOLD">LG GOLD</option>
                <option value="G">G</option>
                <option value="LY">LY</option>
                <option value="Y">Y</option>
                <option value="LR">LR</option>
                <option value="R BLACK">R BLACK</option>
              </select>
            </div>
            {/* <textarea
                        name="remark"
                        placeholder="Additional Remarks"
                        value={formData.remark}
                        onChange={handleChange}
                    ></textarea> */}
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
              <select
                name="Catagories"
                value={formData.catagory}
                onChange={handleChange}
                required
              >
                <option value="">Select catagory</option>
                <option value="GC">GC</option>
                <option value="BC GOLD">BC GOLD</option>
                <option value="RD">RD</option>
                <option value="WE">WE</option>
                <option value="ET">ET</option>
              </select>
            </div>
            <div className="form-row">
              <select
                name="status"
                value={formData.projects[0].status}
                onChange={handleChange}
                required
              >
                <option value="unfinished">Active</option>
                <option value="ongoing">Pending</option>
                <option value="finished">Completed</option>
              </select>
            </div>
            <div className="form-row">
              <textarea
                name="project_remark"
                placeholder="Project Remarks"
                value={formData.projects[0].project_remark}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
      <Modal
        opened={updateModalOpen}
        onClose={closeUpdateModal}
        title="Update Project Status"
        size={420}
        styles={{
          content: {
            margin: '40px auto',
            marginTop: "80px",
            paddingTop: "2.5rem",
            height: '20rem',
          },
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            closeUpdateModal();
          }}
        >
          {/* Select for status */}
          <Select
            label="Status"
            placeholder="Select status"
            value={status}
            onChange={(value) => setStatus(value)}
            data={[
              { value: 'finished', label: 'Finished' },
              { value: 'unfinished', label: 'Unfinished' },
              { value: 'ongoing', label: 'Ongoing' },
            ]}
            required
          />


          <Button onClick={handleStatusUpdate} mt="md">
            Update Status
          </Button>
        </form>
      </Modal>
      <Modal
        opened={isUpdateOpen}
        onClose={closeEditModal}
        title="Edit Company Information"
        size={890}
        styles={{
          content: {
            margin: '20px auto',
            marginTop: '60px',
          },
        }}
      >
        <form onSubmit={handleEdit} style={{ marginTop: '6rem' }}>
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
              <option value="1">Grade A</option>
              <option value="2">Grade B</option>
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
              <option value="Excellent performance in AI development and software solutions.">
                Excellent performance in AI development and software solutions.
              </option>
            </select>
          </div>
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
              value={formData.projects[0].status}
              onChange={handleChange}
              required
            >
              <option value="unfinished">Active</option>
              <option value="ongoing">Pending</option>
              <option value="finished">Completed</option>
            </select>
          </div>
          <div className="form-row">
            <textarea
              name="project_remark"
              placeholder="Project Remarks"
              value={formData.projects[0].project_remark}
              onChange={handleChange}
            ></textarea>
          </div>
          <button onClick={handleEdit} type="submit">Submit</button>
        </form>
      </Modal>
      <Modal
        opened={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Project Details"
        size="lg"
        styles={{
          content: {
            margin: '20px auto',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {selectedProject && (
          <div>
            <h3 style={{ color: '#333' }}>Project Name: {selectedProject.project_name}</h3>
            <p><strong>TIN Number:</strong> {selectedProject.tin_number}</p>
            <p><strong>Manager Name:</strong> {selectedProject.manager_name}</p>
            <p><strong>Company Name:</strong> {selectedProject.company_name}</p>
            <p><strong>Phone Number:</strong> {selectedProject.phone_number}</p>
            <p><strong>Project Cost:</strong> ${selectedProject.projects[0].project_cost}</p>
            <p><strong>Year:</strong> {selectedProject.projects[0].year}</p>
            <p><strong>Status:</strong> {selectedProject.projects[0].status}</p>
            <p><strong>Remarks:</strong> {selectedProject.projects[0].project_remark || "No remarks available."}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DirectorNewProject;
