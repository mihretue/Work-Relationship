import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useState } from 'react';
import { getAllCompanies } from '../../service/api';
const Reports = ({ projects }) => {
    const [companyData, setCompanyData] = useState([])
    const [totalProjects,setTotalProjects] = useState()
    const [totalCost, setTotalCost] = useState()
    const [totalContractors,setTotalContractors] = useState()
    const [contractorMoreThanOne,setContractorMoreThanOne] = useState()
    const fetchAllCompany = async()=>{
        try{
            const response = await getAllCompanies()
            console.log("Full API Response:", response);

            // Check if response and response.data are valid
            if (response) {
                console.log("Response Length:", response.length);

                // Assuming response.data is the array
                setCompanyData(response);
                setTotalProjects(response.length);
            } else {
                console.error("Unexpected response format:", response);
            }
            // setCompanyData(response.data)
            // setTotalProjects(response.data.length)
            // setTotalCost(response.data.reduce((acc,cur)=>acc+cur.cost,0))
            // setTotalContractors(response.data.reduce((acc,cur)=>acc+cur.contractors.length,
            // 0))
        }catch(err){
            console.log(err)
        }
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Project Report", 20, 20);
        doc.setFontSize(12);
        doc.text(`Total Projects: ${projects.length}`, 20, 40);

        // Add project details
        projects.forEach((project, index) => {
            doc.text(`Project ${index + 1}: ${project.projectName}`, 20, 50 + (10 * index));
        });

        doc.save("project_report.pdf");
    };

    useEffect(
        () => {
            fetchAllCompany()
            },[]
    )

    return (
        <div>
            <h2>Reports</h2>
            {totalProjects}
            <button onClick={generatePDF}>Download Report</button>
        </div>
    );
};

export default Reports; 