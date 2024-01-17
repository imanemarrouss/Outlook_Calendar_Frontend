import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    subject: '',
    body: {
      contentType: 'HTML',
      content: '',
    },
    start: {
      dateTime: '',
      timeZone: 'Pacific Standard Time',
    },
    end: {
      dateTime: '',
      timeZone: 'Pacific Standard Time',
    },
    location: {
      displayName: '',
    },
    attendees: [
      {
        emailAddress: {
          address: '',
          name: '',
        },
        type: 'required',
      },
    ],
    allowNewTimeProposals: true,
    transactionId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/createEvent', eventData);
      alert('Event created successfully!');
      // You can perform additional actions here, such as clearing the form or updating the UI.
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input type="text" name="subject" value={eventData.subject} onChange={handleChange} />
        </label>
        <br />
        {/* Add more input fields for other event properties */}
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
