import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useParams();
  const [freeTimes, setFreeTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");


  useEffect(() => {
    // Fetch free times when the component mounts
    const fetchFreeTimes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/findFreeTimes", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailAddress: email }),
        });

        if (!response.ok) {
          throw new Error("Error fetching free times");
        }

        const data = await response.json();
        setFreeTimes(data);
      } catch (error) {
        console.error("Error fetching free times:", error);
      }
    };

    if (email) {
      fetchFreeTimes();
    }
  }, [email]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the backend
    const eventData = {
        subject: `Meeting with ${fullName}`,
        body: {
          contentType: 'HTML',
          content: `Booking details:\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}\nSelected Time: ${selectedTime}`
        },
        // Add other event details as needed
      };
      

    try {
      // Make a request to the backend to create an event
      const response = await fetch("http://localhost:3000/api/createEvent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(eventData),
        body: JSON.stringify({ event: eventData, selectedTime }),

      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // Log the response from the backend
      const responseData = await response.json();
      console.log("Backend Response:", responseData);
      window.alert('Appointement saved successfully!');

      // Clear form fields after successful submission
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className='bookContainer'>
      <h2 className='bookTitle'>Book a session with {user}</h2>
      <form onSubmit={handleSubmit} className='booking__form'>
        {/* Form fields go here */}
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          name='fullName'
          type='text'
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          required
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='message'>Any important note? (optional)</label>
        <textarea
          rows={5}
          name='message'
          id='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

<label htmlFor='session'>Select your preferred session - GMT</label>
<select
  id='session'
  name='session'
  value={selectedTime}
  onChange={(e) => setSelectedTime(e.target.value)}
>
  {freeTimes.map((time, index) => (
    <option key={index} value={time.start}>
      {`${time.start} - ${time.end}`}
    </option>
  ))}
</select>


        <button type="submit" className='bookingBtn'>SEND</button>
      </form>
    </div>
  );
};

export default BookUser;
