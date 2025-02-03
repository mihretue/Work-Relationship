import { useState, useEffect, useCallback } from "react";
import { getAllCompanies } from "../service/api"; // Import your API function

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

      setData(filteredData);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateRow = (id, newValues) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, ...newValues } : row))
    );
  };

  const refreshData =(prevProjects)=>{
    
  }

  return { data, loading, error, updateRow, fetchData };
};

export default useFetchData;
