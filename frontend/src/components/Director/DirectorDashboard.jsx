import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaTasks, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { fetchAllCompany } from './FetchingForReport';
import DirectorHeader from './DirectorHeader';
import jsPDF from 'jspdf';
import { Button } from '@mantine/core';
import 'jspdf-autotable'
import DynamicTableWithYearFilter from './DynamicTableWithYear';
const DirectorDashboard = () => {
    const [companyData, setCompanyData] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [totalCost, setTotalCost] = useState('');
    const [totalContractors, setTotalContractors] = useState(0);
    const [contractorMoreThanOne, setContractorMoreThanOne] = useState(0);

    const generatePDF = () => {
            
    
            const doc = new jsPDF();
            doc.setFont("helvetica", "normal");  // Use a standard font
            console.log(doc.getFontList());
            const columns = ["Company Name", "Number of Projects", "Manager Name", "Costs"];
            // Add the title
            doc.setFontSize(20);
            doc.text("Report", 20, 20);  // Report title
            doc.setFontSize(12);
            //company row
            const tableRows = companyData.map((company) => {
                const totalCosts = company.projects
                  ? company.projects
                      .map((project) => parseFloat(project.project_cost)) // Convert costs to numbers
                      .filter((cost) => !isNaN(cost)) // Filter out invalid costs
                      .reduce((acc, cost) => acc + cost, 0) // Sum up costs
                  : 0;
            
                const formattedTotalCosts = totalCosts.toLocaleString(); // Format costs for readability
            
                return [
                  company.company_name,
                  company.projects ? company.projects.length : 0,
                  company.manager_name,
                  formattedTotalCosts,
                ];
              });

              console.log("rows of company",tableRows)
            
            // Add total projects, cost, and contractors with English labels
            doc.text(`Total Projects: ${totalProjects}`, 20, 40);  // Total Projects
            doc.text(`Total Cost: ${totalCost} $`, 20, 50);  // Total Cost
            doc.text(`Total Contractors: ${totalContractors}`, 80, 40);  // Total Contractors
            
            // Add contractors with more than one project
            doc.text(`Contractors with multiple projects: ${contractorMoreThanOne}`, 80, 50);  // Contractors with more than one project
            
            // // Add project details
            // companyData.forEach((project, index) => {
            //     doc.text(`Project ${index + 1}: ${project.projectName}`, 20, 80 + (10 * index));
            // });
            
            // Save the PDF
            doc.text("Company Project Report",30,60)
            doc.autoTable({
                head:[columns],
                body:tableRows,
                startY:70,
                styles:{
                    halign:"left",
                    valign:"middle"
                }
            })
            doc.save(`Project_report_${totalContractors}.pdf`);
        }
        


    useEffect(() => {
        fetchAllCompany(setCompanyData, setTotalContractors, setTotalProjects, setContractorMoreThanOne, setTotalCost);
    }, []);

    if (!companyData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', marginTop: '20px' }}>
            <DirectorHeader />
            <div style={{marginTop:'2rem',padding:'0.5rem'}}>
                <Button onClick={generatePDF}>Report</Button>
            </div>
            <div className="dashboard-content">
                <div className="card">
                    <FaClipboardList className="card-icon" />
                    <h3>Total Projects</h3>
                    <p>{totalProjects}</p>
                </div>
                <div className="card">
                    <FaTasks className="card-icon" />
                    <h3>Total Contractors</h3>
                    <p>{totalContractors}</p>
                </div>
                <div className="card">
                    <FaCheckCircle className="card-icon" />
                    <h3>Contractors with more than 1 Project</h3>
                    <p>{contractorMoreThanOne}</p>
                </div>
                <div className="card">
                    <FaExclamationCircle className="card-icon" />
                    <h3>Total Cost</h3>
                    <p>{totalCost} $</p>
                </div>
            </div>

            <h3>Company Data</h3>
            {/* <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Company Name</th>
                        <th style={tableHeaderStyle}>Number of Projects</th>
                        <th style={tableHeaderStyle}>Manager Name</th>
                        <th style={tableHeaderStyle}>Total Costs</th>

                    </tr>
                </thead>
                <tbody>
                {companyData.map((company) => {
                    // Extract and format costs for each row
                    const totalCosts = company.projects
                        ? company.projects
                            .map((project) => parseFloat(project.project_cost)) // Convert costs to numbers
                            .filter((cost) => !isNaN(cost)) // Filter out invalid costs
                            .reduce((acc, cost) => acc + cost, 0) // Sum up costs
                        : 0;

                    // Format the total costs for readability
                    const formattedTotalCosts = totalCosts.toLocaleString();

                    return (
                        <tr key={company.id}>
                        <td style={tableCellStyle}>{company.company_name}</td>
                        <td style={tableCellStyle}>{company.projects ? company.projects.length : 0}</td>
                        <td style={tableCellStyle}>{company.manager_name}</td>
                        <td style={tableCellStyle}>{formattedTotalCosts} $</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table> */}
            <DynamicTableWithYearFilter companyData={companyData} />
        </div>
    );
};

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
};

export default DirectorDashboard;
