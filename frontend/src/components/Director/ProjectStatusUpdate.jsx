import React, { useState } from 'react';
import { Modal, Textarea, Button, Select } from '@mantine/core';
import { StatusUpdate } from '../../service/api';
import { showAlertNotification, showErrorNotification, showSuccessNotification } from '../../common/notifications';
const ProjectStatusUpdate = ({ rowData, onStatusUpdate }) => {
  const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company for the modal
  const [remark, setRemark] = useState(""); // Track remark input
  const [status, setStatus] = useState(""); // Track selected status

  const closeModal = () => {
    setSelectedCompany(null);
    setRemark("");
    setStatus("");
  };

  const handleStatus = () => {
    if (!status) {
      showAlertNotification("Please select a status.")
      return;
    }

    const { id: companyId, projects } = selectedCompany;
    const [{ id: projectId }] = projects;

    const data = {
      status:status
    };

    // Call StatusUpdate API
    StatusUpdate(companyId, projectId, data)
      .then((response) => {
        showSuccessNotification("Project status updated successfully!")
        console.log("Response Data:", response);
        onStatusUpdate(); // Trigger a refetch or update
        closeModal(); // Close modal
      })
      .catch((error) => {
        
        showErrorNotification("Failed to update project status. Please try again.")
      });
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button onClick={() => setSelectedCompany(rowData)}>Update Status</Button>

      {/* Modal */}
      <Modal
        opened={!!selectedCompany}
        onClose={closeModal}
        title="Update Project Status"
        size={420}
        styles={{
          content: {
            margin: '40px auto',
            marginTop: "80px",
            paddingTop: "2.5rem",
            height: '20rem',
          },
        }}
      >
        {/* Select for status */}
        <Select
          label="Status"
          placeholder="Select status"
          value={status}
          onChange={(value) => setStatus(value)}
          data={[
            { value: 'finished', label: 'Finished' },
            { value: 'unfinished', label: 'Unfinished' },
            { value: 'ongoing', label: 'Ongoing' },
          ]}
          required
        />

       
        <Button onClick={handleStatus} mt="md">
          Update Status
        </Button>
      </Modal>
    </div>
  );
};

export default ProjectStatusUpdate;
