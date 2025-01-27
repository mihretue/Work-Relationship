import React, { useEffect } from 'react';
import { getAllCompanies } from '../../service/api';


const Projects = () => {
    const [companies, setCompanies] = useState([]);
    const fetchForwardedCompanies = async()=>{
        try{
            const response = await getAllCompanies()
            console.log(response.data)
        }catch{
            console.log('error')
        }
    }
    useEffect(
        () => {
            fetchForwardedCompanies()
            },[]
    )
    return (
        <div>
            
        </div>
    );
};

export default Projects; 