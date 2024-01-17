// import React, { useState, useEffect } from 'react';

// const FreeTimesPage = () => {
//   const [emailAddress, setEmailAddress] = useState(''); // State to store user's email
//   const [freeTimes, setFreeTimes] = useState([]); // State to store retrieved free times

//   const findFreeTimes = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/findFreeTimes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emailAddress }),
//       });

//       if (!response.ok) {
//         throw new Error('Error retrieving free times');
//       }

//       const data = await response.json();
//       setFreeTimes(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch free times when component mounts
//     findFreeTimes();
//   }, []); // Empty dependency array ensures the effect runs only once

//   return (
//     <div>
//       <h1>Free Times</h1>

//       {/* Input for user's email */}
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={emailAddress}
//         onChange={(e) => setEmailAddress(e.target.value)}
//       />

//       {/* Button to trigger the findFreeTimes function */}
//       <button onClick={findFreeTimes}>Find Free Times</button>

//       {/* Display retrieved free times */}
//       <ul>
//         {freeTimes.map((time, index) => (
//           <li key={index}>
//             Start: {time.start}, End: {time.end}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FreeTimesPage;







// import React, { useState, useEffect } from 'react';
// import ReactTimeslotCalendar from 'react-timeslot-calendar';
// import moment from 'moment';

// const FreeTimesPage = () => {
//   const [emailAddress, setEmailAddress] = useState('');
//   const [freeTimes, setFreeTimes] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [formattedFreeTimeslots, setFormattedFreeTimeslots] = useState([]);

//   const findFreeTimes = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/findFreeTimes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emailAddress, selectedDate }),
//       });

//       if (!response.ok) {
//         throw new Error('Error retrieving free times');
//       }

//       const data = await response.json();
//       const formattedTimeslots = data.map((time) => [
//         moment(time.start).format('H'), // Start hour
//         moment(time.end).format('H'),   // End hour
//       ]);
//       setFormattedFreeTimeslots(formattedTimeslots);
      
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     findFreeTimes();
//   }, [selectedDate]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div>
//       <h1>Free Times</h1>

//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={emailAddress}
//         onChange={(e) => setEmailAddress(e.target.value)}
//       />
//      <ReactTimeslotCalendar
//         initialDate={moment().format()}
//         timeslots={formattedFreeTimeslots}
//         timeslotProps={{
//             format: 'h',
//             showFormat: 'h:mm A',
//             freeColor: 'green', // Set the color for free timeslots
//           }}
//         onSelectTimeslot={(selectedTimeslots, lastSelectedTimeslot) => {
//           console.log('Selected Timeslots:', selectedTimeslots);
//           console.log('Last Selected Timeslot:', lastSelectedTimeslot);
//         }}
//       />


//       <button onClick={findFreeTimes}>Find Free Times</button>

//       <ul>
//         {freeTimes.map((time, index) => (
//           <li key={index}>
//             Start: {time.start}, End: {time.end}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FreeTimesPage;


import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ScheduleMeetingModal from './ScheduleMeetingModal';

const localizer = momentLocalizer(moment);

const FreeTimesPage = () => {
    const [freeTimes, setFreeTimes] = useState([]);
    const apiUrl = "http://localhost:3000/api/findFreeTimes";
    const emailAddress = "imane.marrouss@edu.uca.ma";
    const [selectedTime, setSelectedTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Utilize Fetch to retrieve JSON data from the API
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailAddress }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(jsonData => {
            // Extract data and log it to the console
            console.log('Free Times:', jsonData);
            setFreeTimes(jsonData);
          })
          .catch(error => {
            console.error('Error retrieving free times:', error);
          });
      }, []); 
      
      const handleSlotSelect = (slotInfo) => {
        console.log('Selected slot:', slotInfo);
        setSelectedTime(slotInfo);
        // Open the modal
        setIsModalOpen(true);
      };
    
      const handleModalClose = () => {
        // Close the modal
        setIsModalOpen(false);
        // Reset selectedTime
        setSelectedTime(null);
      };

    return (
        <div>
          <h1>Free Times</h1>
          <Calendar
            localizer={localizer}
            events={freeTimes}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSlotSelect}
          />
                <ScheduleMeetingModal isOpen={isModalOpen} onClose={handleModalClose} selectedTime={selectedTime} />

        </div>
      );
    };

export default FreeTimesPage;
