import { useState, useEffect, useCallback } from "react";
import { getAllCompanies, getDeletedProjects } from "../service/api"; // Import your API function

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllCompanies(); // Fetch companies
      console.log("Fetched Companies", result);

      // Filter out deleted companies and projects
      const filteredData = result
        .filter(company => !company.deleted)  // Only keep non-deleted companies
        .map(company => ({
          ...company,
          projects: company.projects.filter(project => !project.deleted),  // Only keep non-deleted projects
        }));
console.log("fileterd Data",filteredData[0].projects[0].deleted)
      setData(filteredData);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);


 
  useEffect(() => {
    
    fetchData();
  }, [fetchData, refreshFlag]);

  const updateRow = (companyId, projectId, newValues) => {
    setData(prevData =>
      prevData.map(company =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.map(project =>
                project.id === projectId ? { ...project, ...newValues } : project
              ),
            }
          : company
      )
    );
    fetchData()
  };
  

  const refreshData =(prevProjects)=>{
    
  }

  return { data, loading, error, updateRow, fetchData };
};

export default useFetchData;
