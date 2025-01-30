import { useState, useEffect } from "react";
import { getAllCompanies } from "../service/api"; // Import your API function

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCompanies(); // Fetch companies
        setData(result);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  const updateRow = (id, newValues) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, ...newValues } : row))
    );
  };
  return { data, loading, error,updateRow };
};

export default useFetchData;
