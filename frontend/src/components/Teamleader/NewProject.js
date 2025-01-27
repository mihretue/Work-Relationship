import React, { useState,useEffect } from "react";
import { Modal, Button} from "@mantine/core"; 
import { MantineReactTable } from "mantine-react-table"; // Import Mantine React Table
import "../../styles/NewProject.css"; // Import your custom CSS
import { createProject,getAllCompanies,forwardToDirector } from "../../service/api";
import { CustomizableMantineTable } from "../../common/customeTable";

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
  const [refetch, setRefetch] = useState(false);

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch companies on component mount
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const companyData = await getAllCompanies(); 
      console.log("Company DAta",companyData[1].projects)
      setData(companyData); // Set the fetched data
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(); // Call the fetch function when the component mounts
  }, []);
  
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  };
  const handleView = (rowData) => {
    console.log("Viewing data:", rowData);
    // Add your view logic here, such as opening a modal with detailed info
  };
  
  const handleDelete = (rowData) => {
    console.log("Deleting data:", rowData);
    // Add your delete logic here, such as making an API call to delete
    setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
  };
  
  const handleForward = (rowData) => {
    const { id } = rowData; // Extract the ID of the item to be forwarded

  forwardToDirector(
    id, 
    (data) => {
      // Success callback
      alert("Project forwarded successfully!");
      console.log("Response Data:", data);
      setRefetch((prev) => !prev);
    },
    (error) => {
      // Error callback
      console.error("Error forwarding project:", error);
      alert(error.message ||"Failed to forward project. Please try again.");
    }
  );
  };
  
  const flattenedProjects = data.reduce((acc, company) => {
    company.projects.forEach(project => {
      acc.push({
        ...company,
        project_name: project.project_name,
        project_status: project.status
      });
    });
    
    return acc;
  }, []);
  const handleEdit = (rowData) => {
    console.log("Editing data:", rowData);
    // Add your edit logic here, such as populating the form with row data
    setFormData(rowData);
    setIsModalOpen(true); // Open the modal for editing
  };
  
  // Table columns definition
  const companyCol = [
    
      { accessorKey: "tin_number", header: "TIN Number" },
      { accessorKey: "manager_name", header: "Manager Name" },
      { accessorKey: "company_name", header: "Company Name" },
      {
        accessorKey: "status",
        header: "Status",
        Cell:({row})=>{
          const {approved, forwarded_to_director} = row.original;
          return (
            <span>
              {
                approved ? "Approved" : forwarded_to_director?"Forwarded":"Pending"
              }
            </span>
          )
        }
      },
      {header:"Project Status",
        accessorKey:'projects',
        Cell:({row})=>{
            const { project_name, project_status } = row.original;
            return (
            <div>
         {project_status || "No status"}
    </div>
  );
}},
      {
        header: "Actions",
        accessorKey: "actions", 
        Cell: ({ row }) => {
          const {forwarded_to_director}= row.original;
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
            </>
            )}
            <Button
              size="xs"
              color="yellow"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
          </div>
          )
        },
      },
    
  ];
  
  return (
    <div className="new-project">
      {/* New Project Button */}
      <Button size={16}  onClick={() => setIsModalOpen(true)}>New Project</Button>
      {/* <CustomizableMantineTable
          endPoint="companies/"
          columns={companyCol}
          refetch={refetch}
          setRefetch={setRefetch}
          // finalData={[{ tin_number: "1234", manager_name: "John Doe" }]}
        /> */}
        <MantineReactTable
          columns={companyCol}
          data={flattenedProjects}
          state={{
            isLoading, // Show loading state
          }}
          enableSorting
          enablePagination
          enableGlobalFilter
    />
      {/* Modal for the Form */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        size={120}
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
                pattern="[0-9]{10}" // Example for a 10-digit phone number
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
                        <option value="active">Active</option>
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

      
    </div>
  );
};

export default NewProject;
