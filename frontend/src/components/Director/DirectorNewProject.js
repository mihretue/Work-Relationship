import React, { useState, useEffect } from "react";
import { Modal, Button, Select } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import "../../styles/NewProject.css";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllCompanies, createProject, forwardToDirector, StatusUpdate, editCompany, deleteProjects } from "../../service/api";
import { FaCreativeCommonsNcJp } from "react-icons/fa";
import ProjectStatusUpdate from "./ProjectStatusUpdate";
import { showErrorNotification, showSuccessNotification, showAlertNotification } from "../../common/notifications";
import useFetchData from "../../common/useFetchData";
// import ProjectModal from "../../common/Project/ProjectModal";
const DirectorNewProject = () => {
    // const [data, setData] = useState([]);
    const { data, loading, error, updateRow, fetchData } = useFetchData()
    const [refetch, setRefetch] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company for the modal
    // const [remark, setRemark] = useState(""); // Track remark input
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false); // State for the modal
    // const [selectedCompany, setSelectedCompany] = useState(null); 
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isStatusUpdateOpen, setIsStatusUpdateOpen]= useState(false)
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
        setFormData((prevData) => {
            if (name in prevData.projects[0]) {
                return {
                    ...prevData,
                    projects: [
                        {
                            ...prevData.projects[0],
                            [name]: value,
                        },
                    ],
                };
            } else {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
        });
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
            await fetchData()
            setRefetch(true)
        } catch (error) {
            console.error("Error creating project:", error);
            showErrorNotification(`Error creating project: ${error}`, "Error")
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



    const handleView = (project) => {
        setSelectedProject(project)
        setViewModalOpen(true)
    }

    const handleForward = (rowData) => {
        const { id } = rowData;
        forwardToDirector(
            id,
            (data) => {

                showSuccessNotification("Project forwarded successfully!")
                console.log("Response Data:", data);
                setRefetch((prev) => !prev);
                updateRow(id, { forwarded_to_director: true })
            },
            (error) => {

                console.error("Error forwarding project:", error);

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

        console.log("Selected Row Data:", rowData)
        setSelectedCompany(rowData);
<<<<<<< HEAD
        setUpdateModalOpen(true);
    };

=======
        
        
        setIsStatusUpdateOpen(true)
    };
    const handleDelateFlag = (rowData)=>{
        console.log("Selected Row Data:", rowData)
        setSelectedCompany(rowData);
        handleDelete()
    }
    
>>>>>>> acf56c0eb9c2ae4160662d1d313ba1323ab2b457
    const handleEditModal = (rowData) => {
        setSelectedCompany(rowData);
        setIsUpdateOpen(true)
        setFormData({
            tin_number: rowData.tin_number || "",
            manager_name: rowData.manager_name || "",
            company_name: rowData.company_name || "",
            phone_number: rowData.phone_number || "",
            company_type: rowData.company_type || "",
            grade: rowData.grade || "",
            organization: rowData.organization || "",
            performance: rowData.performance || "",
            approved: rowData.approved || false,
            projects: rowData.projects?.length > 0 ? [...rowData.projects] : [
                {
                    project_name: "",
                    project_cost: "",
                    year: "",
                    categories: "",
                    status: "unfinished",
                    project_remark: "",
                }
            ]
        });

        setIsUpdateOpen(true);
    };


    const closeEditModal = () => {
        setIsUpdateOpen(false)
        setSelectedCompany(null)
        setStatus("")
    }
    const handleStatusUpdate = () => {
        
        setIsStatusUpdateOpen(false)
        if (!selectedCompany || !status) {
            // alert("Please select a status before updating."); 
            showAlertNotification("Please select a status before updating.", "Warning")
            return;
        }
        const { id: companyId, projects } = selectedCompany;
        const [{ id: projectId }] = projects;
        console.log("Updating status for:", { companyId, projectId, status });
        StatusUpdate(
            companyId,
            projectId,
            status,
            (data) => {
<<<<<<< HEAD

                showSuccessNotification("Project status updated successfully!", 'success')
                console.log("Response Data:", data);
                setRefetch((prev) => !prev);
                closeModal()
=======
                
            showSuccessNotification("Project status updated successfully!",'success')
            console.log("Response Data:", data);
            // setRefetch((prev) => !prev);
           
            
            updateRow(companyId,projectId,{deleted:true})
               
>>>>>>> acf56c0eb9c2ae4160662d1d313ba1323ab2b457
            },

            (error) => {
                console.error("Error updating project status:", error);
                showErrorNotification("Failed to update project status. Please try again." || error.message)
                // alert(error.message || "Failed to updating project status. Please try again.");
            }

        )
        

    }

    // const handleDelete = async () => {
    //     if (!selectedCompany) {
    //         // alert("Please select a status before updating."); 
    //         showAlertNotification("Please select a status before updating.","Warning")
    //         return;
    //     }
    //     const { id: companyId, projects } = selectedCompany;
    //     const [{ id: projectId }] = projects;
    //     console.log("project id",projectId,"company id", companyId)
    //     // Optional: Confirm before deletion
    //     const confirmed = window.confirm("Are you sure you want to delete this project?");
    //     if (!confirmed) return;
    
    //     // Call the delete function
    //     try {
    //         const response = await deleteProjects(companyId, projectId);
    //         if (response.success) {
    //             showAlertNotification("Project deleted successfully.", "Success");
    
    //             // After deletion, update the UI
    //             // setData(prevData =>
    //             //     prevData.map(company => 
    //             //         company.id === companyId
    //             //             ? {
    //             //                 ...company,
    //             //                 projects: company.projects.map(project =>
    //             //                     project.id === projectId ? { ...project, deleted: true } : project
    //             //                 )
    //             //             }
    //             //             : company
    //             //     )
    //             // );
    //             updateRow(companyId, {deleted:true});
    //             showSuccessNotification("Project Deleted Successfully.","Success")
    //         } else {
    //             showAlertNotification("Failed to delete the project. Please try again.", "Error");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting project:", error);
    //         showAlertNotification("An error occurred while deleting the project.", "Error");
    //     }
    // };

    const handleDelete = async () => {
        if (!selectedCompany || !selectedCompany.projects || selectedCompany.projects.length === 0) {
            showAlertNotification("No projects found for the selected company.", "Warning");
            return;
        }
<<<<<<< HEAD

        const { id: companyId, projects } = companyData;
        const [{ id: projectId }] = projects; // Assuming each company has at least one project

        // Optional: Confirm before deletion
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

        // Call the delete function
        try {
            const response = await deleteProjects(companyId, projectId);
            if (response.success) {
                showAlertNotification("Project deleted successfully.", "Success");

                // After deletion, update the UI
                // setCompanyData(prevData =>
                //     prevData.map(company => 
                //         company.id === companyId
                //             ? {
                //                 ...company,
                //                 projects: company.projects.map(project =>
                //                     project.id === projectId ? { ...project, deleted: true } : project
                //                 )
                //             }
                //             : company
                //     )
                // );
                updateRow(companyId, { deleted: true });
                showSuccessNotification("Project Deleted Successfully.", "Success")
=======
    
        const { id: companyId, projects } = selectedCompany;
        const [{ id: projectId }] = projects;
    
        console.log("Deleting project:", { companyId, projectId });
    
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;
    
        try {
            const response = await deleteProjects(companyId, projectId);
            console.log("Delete API Response:", response);
    
            if (!response) {
                throw new Error("No response from deleteProjects");
            }
    
            // Check API's success response
            if (response.success || response.message === "Deleted") {
                showAlertNotification("Project deleted successfully.", "Success");
                updateRow(companyId,projectId, { deleted: true });
>>>>>>> acf56c0eb9c2ae4160662d1d313ba1323ab2b457
            } else {
                showAlertNotification("Failed to delete the project. Please try again.", "Error");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            showAlertNotification(`Error: ${error.message}`, "Error");
        }
    };
<<<<<<< HEAD


    const handleEdit = () => {
        if (!selectedCompany) {
=======
    
    const handleEdit =()=>{
        if(!selectedCompany){
>>>>>>> acf56c0eb9c2ae4160662d1d313ba1323ab2b457
            showAlertNotification("Please select a Company before updating", 'Warning')
        }
        const { id: companyId } = selectedCompany;

        editCompany(
            companyId,
            formData,
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

    const closeModal = () => {
        setSelectedCompany(null);
        // setRemark("");
        setStatus("");
    };





    const flattenedProjects = data.reduce((acc, company) => {
        company.projects
            .filter(project => !project.deleted)
            .forEach(project => {
                acc.push({
                    ...company,
                    project_name: project.project_name,
                    project_status: project.status,

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
                                onClick={() => handleDelateFlag(row.original)}
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
    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error Loading Data.</p>
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
                                name="categories"
                                value={formData.projects[0].categories}
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
                opened={isStatusUpdateOpen}
                onClose={()=>setIsStatusUpdateOpen(false)}
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
<<<<<<< HEAD
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
=======
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            
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


                        <Button onClick={()=>{ handleStatusUpdate();}} mt="md">
                            Update Status
                        </Button>
                        </form>
>>>>>>> acf56c0eb9c2ae4160662d1d313ba1323ab2b457
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
                            name="categories"
                            value={formData.projects[0].categories}
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
            <Modal
                opened={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="Project Details"
                size="lg"
                styles={{
                    content: {
                        margin: '20px auto',
                        marginTop: '60px',
                        width: '80%',
                        maxWidth: '800px',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                {selectedProject && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                            {selectedProject.project_name}
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <p><strong>TIN Number:</strong> {selectedProject.tin_number}</p>
                            <p><strong>Manager Name:</strong> {selectedProject.manager_name}</p>
                            <p><strong>Company Name:</strong> {selectedProject.company_name}</p>
                            <p><strong>Phone Number:</strong> {selectedProject.phone_number}</p>
                            <p><strong>Project Cost:</strong> ${selectedProject.projects[0].project_cost}</p>
                            <p><strong>Year:</strong> {selectedProject.projects[0].year}</p>
                            <p><strong>Status:</strong>
                                <span style={{
                                    color: selectedProject.projects[0].status === 'Completed' ? 'green' : 'red',
                                    fontWeight: 'bold',
                                }}>
                                    {selectedProject.projects[0].status}
                                </span>
                            </p>
                            <p><strong>Remarks:</strong> {selectedProject.projects[0].project_remark}</p>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default DirectorNewProject;
