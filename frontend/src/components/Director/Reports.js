import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { useState } from 'react';
import amharicfont from "../../common/washrab.ttf"
// import { getAllCompanies } from '../../service/api';
import { fetchAllCompany } from './FetchingForReport';
import { amharicFont } from '../../common/base64';
const Reports = ({ projects }) => {
    const [companyData, setCompanyData] = useState([])
    const [totalProjects,setTotalProjects] = useState()
    const [totalCost, setTotalCost] = useState()
    const [totalContractors,setTotalContractors] = useState()
    const [contractorMoreThanOne,setContractorMoreThanOne] = useState()

    // const fetchAllCompany = async()=>{
    //     try{
    //         const response = await getAllCompanies()
    //         console.log("Full API Response:", response);

    //         // Check if response and response.data are valid
    //         if (response) {
    //             console.log("Response Length:", response.projects);
    //             const allProjects = response
    //                                         .map(item=>item.projects)
    //                                         .filter(projects=>projects!== undefined)
    //                                         .flat()
    //                         console.log("All Projects: ",allProjects)

    //             const companiesHavingMoreThanOneProjects = response.filter((company) => company.projects && company.projects.length > 1);
    //             const costs = allProjects.map((item)=>item.project_cost)
    //                                 // .filter((item)=>item.project_cost)
    //                                 // .flat()
    //             const numberdCosts = costs.map(parseFloat).reduce((acc, currentValue) => acc + currentValue, 0)
    //             const LocalString = numberdCosts.toLocaleString()
    //             console.log("Total Cost",costs)
    //                 console.log("numbered array",LocalString)
    //             // Assuming response.data is the array
    //             setCompanyData(response);
    //             setTotalContractors(response.length);
    //             setTotalProjects(allProjects.length)
    //             setContractorMoreThanOne(companiesHavingMoreThanOneProjects.length)
    //             setTotalCost(LocalString)
    //         } else {
    //             console.error("Unexpected response format:", response);
    //         }
    //         // setCompanyData(response.data)
    //         // setTotalProjects(response.data.length)
    //         // setTotalCost(response.data.reduce((acc,cur)=>acc+cur.cost,0))
    //         // setTotalContractors(response.data.reduce((acc,cur)=>acc+cur.contractors.length,
    //         // 0))
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

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
        
        // // Add project details
        // companyData.forEach((project, index) => {
        //     doc.text(`Project ${index + 1}: ${project.projectName}`, 20, 80 + (10 * index));
        // });
        
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