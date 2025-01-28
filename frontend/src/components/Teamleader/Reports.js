import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useState } from 'react';
import amharicfont from "../../common/washrab.ttf"
// import { getAllCompanies } from '../../service/api';
import { fetchAllCompany } from '../Director/FetchingForReport';
import { amharicFont } from '../../common/base64';
const Reports = ({ projects }) => {
    const [companyData, setCompanyData] = useState([])
    const [totalProjects,setTotalProjects] = useState()
    const [totalCost, setTotalCost] = useState()
    const [totalContractors,setTotalContractors] = useState()
    const [contractorMoreThanOne,setContractorMoreThanOne] = useState()

    

    const generatePDF = () => {
        console.log(amharicfont);

        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");  // Use a standard font
        console.log(doc.getFontList());
        
        // Add the title
        doc.setFontSize(20);
        doc.text("Report", 20, 20);  // Report title
        doc.setFontSize(12);
        
        // Add total projects, cost, and contractors with English labels
        doc.text(`Total Projects: ${totalProjects}`, 20, 40);  // Total Projects
        doc.text(`Total Cost: ${totalCost} $`, 20, 50);  // Total Cost
        doc.text(`Total Contractors: ${totalContractors}`, 20, 60);  // Total Contractors
        
        // Add contractors with more than one project
        doc.text(`Contractors with multiple projects: ${contractorMoreThanOne}`, 20, 70);  // Contractors with more than one project
        
        // Save the PDF
        doc.save(`Project_report_${totalContractors}.pdf`);
    }
    

    useEffect(
        () => {
            fetchAllCompany(setCompanyData, setTotalContractors, setTotalProjects, setContractorMoreThanOne, setTotalCost)
            },[]
    )

    return (
        <div>
            <h2>Reports</h2>
            {totalProjects},
            {totalContractors},
            {`${totalCost}$`}
            <button onClick={generatePDF}>Download Report</button>
        </div>
    );
};

export default Reports; 