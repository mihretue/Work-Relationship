const CompanyRow = ({ company }) => {
    return (
      <div className="company-row">
        <p>{company.name}</p>
        {company.forwarded_to_director === false && (
          <>
            <button onClick={() => forwardCompany(company.id)}>Forward</button>
            <button onClick={() => deleteCompany(company.id)}>Delete</button>
          </>
        )}
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
  