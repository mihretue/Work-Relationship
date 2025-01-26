import React, { useState,useEffect } from 'react';
import { getAllCompanies,approveCompany } from '../../service/api';
// import CompanyRow from  "./CompanyRow"
import { Button, Textarea,Modal } from '@mantine/core';
import { MantineReactTable } from 'mantine-react-table';
const Projects = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError]=useState('')
    const [remark,setRemark] = useState('')
    const [message,setMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany,setSelectedCompany] = useState(null)


    const fetchForwardedCompanies = async()=>{
        try{
            const response = await getAllCompanies()
            console.log("last one",response[8])
            const forwarded = response.filter(
                (company) => company.forwarded_to_director === true
            )
            console.log(forwarded[3])
            setCompanies(forwarded)
        }catch{
            console.log('error')
        }
    }

    const handleApprove= async()=>{
        if(!selectedCompany) return;
        try{
            const response = await approveCompany(selectedCompany.id,remark)
            console.log(response)
            setMessage(response.message ||"Company approved successfully")
            setError("")
            setSelectedCompany(null)
            fetchForwardedCompanies()
        }catch(err){
            console.log('error')
            setMessage(''); // Clear success message
            setError(err.response?.data?.error || "Failed to approve company.");
        }
    }
    const handleView=()=>{
        console.log("view")
    }

    const openApprovalModal = (company) => {
        setSelectedCompany(company);
        setRemark(""); // Clear previous remark
      };
    
      // Close modal
      const closeModal = () => {
        setSelectedCompany(null);
        setError("");
        setMessage("");
      };
    
    useEffect(
        () => {
            fetchForwardedCompanies()
            },[]
    )
    
    const companyCol = [
        { accessorKey: "tin_number", header: "TIN Number" },
        { accessorKey: "manager_name", header: "Manager Name" },
        { accessorKey: "company_name", header: "Company Name" },
        // {accessorKey:"approved",header:"Status"},
        {
          header: "Actions",
          accessorKey: "actions", 
          Cell: ({ row }) => {
            const { forwarded_to_director } = row.original; 
            const company = row.original
            return (
                <div className="action-buttons">
                    <Button
                    size="xs"
                    color="blue"
                    onClick={() => handleView(row.original)}
                    >
                        View
                    </Button>
                
                    <Button
                        size="xs"
                        color={company.approved ? "gray" : "green"} // Dynamic color
                        onClick={() => openApprovalModal(company)}
                        disabled={company.approved} // Disable button if approved
                        >
                        {company.approved ? "Approved" : "Approve"}
                    </Button>

                </div>
            );
          },
        },
      ];
    return (
        <div>
            <MantineReactTable
                columns={companyCol}
                data={companies}
                state={{
                    isLoading, // Show loading state
                }}
                enableSorting
                enablePagination
                enableGlobalFilter
            />

            <Modal
                opened={!!selectedCompany}
                onClose={closeModal}
                title="Approve a Project"
                size={420}
                styles={{
                content: {
                margin: '40px auto', 
                marginTop:"80px",
                paddingTop:"2.5rem",
                height:'20rem'
                },
                }}
            >
                <Textarea
                    name="remark"
                    placeholder="Additional Remarks"
                    value={remark}
                    onChange={(e)=>setRemark(e.target.value)}
                />
                <Button onClick={handleApprove} mt="md">
                    Approve
                </Button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal>
    </div>
    );
};

  // Example button handler functions
  const forwardCompany = (id) => {
    console.log(`Forwarding company with ID: ${id}`);
  };
  
  const deleteCompany = (id) => {
    console.log(`Deleting company with ID: ${id}`);
  };
  
export default Projects; 