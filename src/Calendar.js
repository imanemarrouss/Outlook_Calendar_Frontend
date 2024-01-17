// Calendar.js
import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
const localizer = momentLocalizer(moment);

const Calendar = ({ apiUrl }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        const subjectColorMap = {}; // Map to store colors based on subject

        const fetchedEvents = jsonData.value.map((event) => {
          const {
            lastModifiedDateTime,
            subject,
            bodyPreview,
            importance,
            sensitivity,
            start,
            end,
            isCancelled,
          } = event;

          // Assign a color based on the subject
          if (!subjectColorMap[subject]) {
            subjectColorMap[subject] = getRandomColor();
          }

          return {
            title: subject,
            start: new Date(start.dateTime),
            end: new Date(end.dateTime),
            description: bodyPreview,
            importance,
            isCancelled,
            color: subjectColorMap[subject], // Assign color based on subject
          };
        });

        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'API:", error);
      });
  }, [apiUrl]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = event.color || '#81c784'; // Use the assigned color or default

    if (event.isCancelled) {
      backgroundColor = '#e57373'; // Cancelled event color
    } else if (event.importance === 'High') {
      backgroundColor = '#f06292'; // High importance color
    } else if (event.importance === 'Medium') {
      backgroundColor = '#64b5f6'; // Medium importance color
    } 
    if (event.subject.toLowerCase().includes('free time')) {
      backgroundColor = '#4caf50'; // Green color for "FREE TIME" events
    
    
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        border: '2px solid #fff',
        color: '#fff',
        display: 'block',
        fontWeight: 'bold',
      },
    };
  };

  return (
    <div  style={{  paddingLeft:'70px'}}>
      <h1>Colorful Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800,   maxwidth: '1200px'}}
        eventStyleGetter={eventStyleGetter}
        selectable

      />
    </div>
  );
};

export default Calendar;
