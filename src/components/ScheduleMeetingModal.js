import React, { useState } from 'react';
import Modal from 'react-modal';
import './ScheduleMeetingModal.css'; // Import your CSS file for styling

const ScheduleMeetingModal = ({ isOpen, onClose, selectedTime }) => {
  const [meetingDetails, setMeetingDetails] = useState({
    subject: '',
    // ... other form fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Make API request to schedule the meeting using meetingDetails and selectedTime
    // Close the modal after successful submission
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="custom-modal">
      <div className="modal-header">
        <h2>Schedule Meeting</h2>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
      <form onSubmit={handleFormSubmit} className="modal-form">
        {/* Form fields go here */}
        <label className="form-label">
          Subject:
          <input type="text" name="subject" value={meetingDetails.subject} onChange={handleInputChange} className="form-input" />
        </label>
        {/* ... other form fields */}
        <button type="submit" className="submit-button">Schedule Meeting</button>
      </form>
    </Modal>
  );
};

export default ScheduleMeetingModal;
