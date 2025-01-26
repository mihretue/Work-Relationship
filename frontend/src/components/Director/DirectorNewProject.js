import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import "../../styles/NewProject.css";
import { Navigate } from "react-router-dom";

const DirectorNewProject = () => {
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

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects"));
        if (storedProjects) {
            setProjects(storedProjects);
        }
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            ...formData,
            projects: [
                {
                    ...formData.projects[0],
                    year: parseInt(formData.projects[0].year, 10),
                },
            ],
            id: projects.length + 1,
        };

        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        setIsModalOpen(false);
        resetForm();
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
    };

    const handleDelete = (id) => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };

    const handleEdit = (project) => {
        setFormData(project);
        setIsModalOpen(true);
    };

    const companyCol = [
        { accessorKey: "tin_number", header: "TIN Number" },
        { accessorKey: "manager_name", header: "Manager Name" },
        { accessorKey: "company_name", header: "Company Name" },
        {
            header: "Actions",
            accessorKey: "actions",
            Cell: ({ row }) => (
                <div className="action-buttons">
                    <Button
                        size="xs"
                        color="yellow"
                        onClick={() => handleEdit(row.original)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="xs"
                        color="red"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    const navigate = Navigate()
const handleNavigation =()=>{
    navigate('/director/new-projects/approve-projects')
}
    return (
        <div className="new-project">
            <Button size={16} onClick={() => setIsModalOpen(true)}>
                New Project
            </Button>
            <Button size={16} onClick={handleNavigation()}>
                Approve Projects
            </Button>
            <MantineReactTable
                columns={companyCol}
                data={projects}
                state={{
                    isLoading: false,
                }}
                enableSorting
                enablePagination
                enableGlobalFilter
            />
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
                            value={formData.projects[0].status}
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
                            value={formData.projects[0].project_remark}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default DirectorNewProject;
