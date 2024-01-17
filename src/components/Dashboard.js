import { time } from "../utils/resource";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import DatePicker from 'react-datepicker';

const Dashboard = () => {
    const [selectedTimezone, setSelectedTimezone] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedule, setSchedule] = useState([
        { day: "Sun", startTime: "", endTime: "" },
        { day: "Mon", startTime: "", endTime: "" },
        { day: "Tue", startTime: "", endTime: "" },
        { day: "Wed", startTime: "", endTime: "" },
        { day: "Thu", startTime: "", endTime: "" },
        { day: "Fri", startTime: "", endTime: "" },
        { day: "Sat", startTime: "", endTime: "" },
    ]);
    const handleTimeChange = (e, id) => {
        const { name, value } = e.target;
        if (value === "Select") return;
    
        // Convert time to 24-hour format
        const formattedTime = convertTo24HourFormat(value);
    
        const list = [...schedule];
        list[id][name] = formattedTime;
        setSchedule(list);
    };
    
    

    // const handleSaveSchedules = () => {
    //     if (JSON.stringify(selectedTimezone) !== "{}") {
    //         console.log(schedule);
    //     } else {
    //         toast.error("Select your timezone");
    //     }
    // };
 
    
            
    const handleSaveSchedules = async () => {
        if (JSON.stringify(selectedTimezone) !== '{}') {
          // Use the selected date
          const currentDate = selectedDate.toISOString().split('T')[0];
    
          const events = schedule.map((sch) => {
            // Ensure times are in HH:mm format (24-hour)
            const formattedStartTime = sch.startTime ? convertTo24HourFormat(sch.startTime) : '';
            const formattedEndTime = sch.endTime ? convertTo24HourFormat(sch.endTime) : '';
    
            const startTime = formattedStartTime ? `${currentDate}T${formattedStartTime}:00` : '';
            const endTime = formattedEndTime ? `${currentDate}T${formattedEndTime}:00` : '';
    
            return {
              subject: 'Free Time',
              isAllDay: false,
              start: {
                dateTime: startTime,
                timeZone: 'UTC',
              },
              end: {
                dateTime: endTime,
                timeZone: 'UTC',
              },
              showAs: 'free',
            };
          });
    
          try {
            const response = await fetch('http://localhost:3000/api/createFreeTime', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(events),
            });
    
            if (response.ok) {
              console.log('Events saved successfully');
            } else {
              console.error('Failed to save events');
            }
          } catch (error) {
            console.error('Error saving events:', error);
          }
        } else {
          toast.error('Select your timezone');
        }
      };
    
    // Function to convert time to 24-hour format
    const convertTo24HourFormat = (time) => {
        const [hour, minute] = time.split(":");
        const isPM = time.toLowerCase().includes("pm");
    
        let formattedHour = parseInt(hour, 10);
        if (isPM && formattedHour !== 12) {
            formattedHour += 12;
        } else if (!isPM && formattedHour === 12) {
            formattedHour = 0;
        }
    
        return `${formattedHour.toString().padStart(2, "0")}:${minute}`;
    };
    
    
    return (
        <div>
            <nav className='dashboard__nav'>
                <h2>BookMe</h2>
                <button  className='logout__btn'>
                    Log out
                </button>
            </nav>
            <main className='dashboard__main'>
                <h2 className='dashboard__heading'>Select your availability</h2>
                <div className='timezone__wrapper'>
                    <p>Pick your timezone</p>
                    <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                    />
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />

                    {schedule.map((sch, id) => (
                        <div className='form' key={id}>
                            <p>{sch.day}</p>
                            <div className='select__wrapper'>
                                <label htmlFor='startTime'>Start Time</label>
                                <select
                                    name='startTime'
                                    id='startTime'
                                    onChange={(e) => handleTimeChange(e, id)}
                                >
                                    {time.map((t) => (
                                        <option key={t.id} value={t.t} id={t.id}>
                                            {t.t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='select__wrapper'>
                                <label htmlFor='endTime'>End Time</label>
                                <select
                                    name='endTime'
                                    id='endTime'
                                    onChange={(e) => handleTimeChange(e, id)}
                                >
                                    {time.map((t) => (
                                        <option key={t.id} value={t.t} id={t.id}>
                                            {t.t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='saveBtn__container'>
                    <button onClick={handleSaveSchedules}>SAVE SCHEDULES</button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
