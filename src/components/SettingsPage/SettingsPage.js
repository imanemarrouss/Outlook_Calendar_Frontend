import React, { useState } from 'react';
import CalendarSimple from '../CalendarSimple/CalendarSimple';
import './SettingsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDayConfig, setSelectedDayConfig] = useState(null);
  const [timeRanges, setTimeRanges] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState(''); // Initialisez le fuseau horaire par défaut selon vos besoins
  const availableTimeZones = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const handleDaySelect = (day) => {
    setSelectedDayConfig({ day, startTime: '09:00', endTime: '17:00', duration: 60 });
  };

  const handleStartTimeChange = (event) => {
    setSelectedDayConfig({ ...selectedDayConfig, startTime: event.target.value });
  };

  const handleEndTimeChange = (event) => {
    setSelectedDayConfig({ ...selectedDayConfig, endTime: event.target.value });
  };

  const handleDurationChange = (event) => {
    setSelectedDayConfig({ ...selectedDayConfig, duration: parseInt(event.target.value, 10) });
  };

  const handleSaveConfig = () => {
    setTimeRanges((prevRanges) => [...prevRanges, selectedDayConfig]);
    setSelectedDays([...selectedDays, selectedDayConfig.day]);
    setSelectedDayConfig(null);
  };
  const handleDelete = (index) => {
    const updatedRanges = [...timeRanges];
    updatedRanges.splice(index, 1);
    setTimeRanges(updatedRanges);
  };
  const handleSaveAll = async () => {
    console.log('Before try block');
    const handleDelete = (index) => {
      const updatedRanges = [...timeRanges];
      updatedRanges.splice(index, 1);
      setTimeRanges(updatedRanges);
    };
    try {
      console.log('Inside try block');
      // Make a POST request to your backend for each configuration
      for (const range of timeRanges) {

        console.log(formatDate(range.day));

        // Add a check for the existence of 'start' and 'end' properties
        if (range.startTime && range.endTime) {
          const formattedDay = formatDate(range.day);
          console.log('Formatted Date:', formattedDay);  // Ajoutez cette ligne pour afficher la date formatée

          const response = await fetch('http://localhost:3000/api/createFreeTime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              day: formattedDay,
              startTime: `${range.startTime}`,
              endTime: `${range.endTime}`,
              timeZone: 'Pacific Standard Time',
              duration: range.duration,
            }),
          });
          console.log(Response);

          console.log('After fetch');

          if (!response.ok) {
            console.error('Error:', response.statusText);
            // Handle the error, show an error message, etc.
            return;
          }

          const responseData = await response.json();
          console.log('Backend Response:', responseData);

        } else {
          console.warn('Range object is missing start or end property:', range);
        }
      }

      // Reset selections after successful save
      setSelectedDays([]);
      setTimeRanges([]);
      alert('Events saved successfully!');

    } catch (error) {
      console.error('Error:', error);
      // Handle other types of errors (e.g., network errors)
    }
  };

  return (
    <div className="settings-page" >
      <h1>Paramétrage des horaires disponibles</h1>
      <CalendarSimple onDaySelect={handleDaySelect} selectedDays={selectedDays} />

      {selectedDayConfig && (
        <div className="day-settings" style={{ maxWidth: '1600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div className="day-name" style={{ flex: '1' }}>{selectedDayConfig.day.toLocaleDateString()}</div>
          </div>

          <div className="time-range" style={{ display: 'flex', alignItems: 'center' }}>
            <label>From:</label>
            <input type="time" value={selectedDayConfig.startTime} onChange={handleStartTimeChange} />
            <label>To:</label>
            <input type="time" value={selectedDayConfig.endTime} onChange={handleEndTimeChange} />

            <label>Duration (min):</label>
            <select value={selectedDayConfig.duration} onChange={handleDurationChange}>

              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>


            </select>

            <button onClick={handleSaveConfig} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      )}

<div className="all-settings">
        {timeRanges.map((range, index) => (
          <div key={index} className="added-time-range">
            {range.day.toLocaleDateString()}: From {range.startTime} to {range.endTime}, Duration: {range.duration} min
            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '5px', cursor: 'pointer' }} onClick={() => handleDelete(index)} />

          </div>
        ))}
        {timeRanges.length > 0 && (
          <button onClick={handleSaveAll} style={{ marginTop: '10px' }}>
            Save
          </button>        )}
      </div>
    </div>
  );
};

export default SettingsPage;

