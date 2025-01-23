import React from 'react';
import jsPDF from 'jspdf';

const Reports = ({ projects }) => {
    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(20);
    //     doc.text("Project Report", 20, 20);
    //     doc.setFontSize(12);
    //     doc.text(`Total Projects: ${projects.length}`, 20, 40);

    //     // Add project details
    //     projects.forEach((project, index) => {
    //         doc.text(`Project ${index + 1}: ${project.projectName}`, 20, 50 + (10 * index));
    //     });

    //     doc.save("project_report.pdf");
    // };

    return (
        <div>
            <h2>Reports</h2>
            {/* <button onClick={generatePDF}>Download Report</button> */}
        </div>
    );
};

export default Reports; 