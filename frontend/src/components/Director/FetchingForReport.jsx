// companyService.js
import { getAllCompanies } from '../../service/api'; // Adjust the import path based on your setup

export const fetchAllCompany = async (setCompanyData, setTotalContractors, setTotalProjects, setContractorMoreThanOne, setTotalCost) => {
    try {
        const response = await getAllCompanies();
        console.log("Full API Response:", response);

        if (response) {
            const allProjects = response
                .map((item) => item.projects)
                .filter((projects) => projects !== undefined)
                .flat();

            console.log("All Projects: ", allProjects);

            const companiesHavingMoreThanOneProjects = response.filter(
                (company) => company.projects && company.projects.length > 1
            );

            const costs = allProjects.map((item) => item.project_cost);
            const numberedCosts = costs.map(parseFloat).reduce((acc, currentValue) => acc + currentValue, 0);
            const localString = numberedCosts.toLocaleString();

            console.log("Total Cost", costs);
            console.log("Numbered array", localString);

            // Set state in the parent component
            setCompanyData(response);
            setTotalContractors(response.length);
            setTotalProjects(allProjects.length);
            setContractorMoreThanOne(companiesHavingMoreThanOneProjects.length);
            setTotalCost(localString);
        } else {
            console.error("Unexpected response format:", response);
        }
    } catch (err) {
        console.log(err);
    }
};
