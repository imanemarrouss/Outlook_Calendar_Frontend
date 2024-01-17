import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FreeTimesPage from './components/FreeTimesPage';
import Signup from './components/Signup';
import Profile from './components/Profile';
import BookUser from './components/BookUser';
import Login from './components/Login';
import ScheduleFreeTimes from './components/ScheduleFreeTimes';
import SidebarComponent from './SidebarComponent'
import SettingsPage from './components/SettingsPage/SettingsPage';
Modal.setAppElement('#root'); // assuming '#root' is the id of your root element

const localizer = momentLocalizer(moment);
const LandingPage = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Welcome to My App</h1>
    <div style={styles.linkContainer}>
      <Link to="/book" style={styles.link}>
        User Space
      </Link>
      <br />
      <Link to="/login" style={styles.link}>
        Admin Space
      </Link>
    </div>
  </div>
);
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: '#007BFF',
    margin: '10px',
  },
};
const App = () => {
  const [events, setEvents] = useState([]);
  const [userType, setUserType] = useState(null);

  const apiUrl = "http://localhost:3000/api/events";
  useEffect(() => {
    // Utiliser Fetch pour récupérer les données JSON depuis l'API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonData => {
        // Extraction des données et affichage dans la console
        const fetchedEvents = jsonData.value.map(event => {
          const {
            lastModifiedDateTime,
            subject,
            bodyPreview,
            importance,
            sensitivity,
            start,
            end
          } = event;

          console.log("Last Modified DateTime:", lastModifiedDateTime);
          console.log("Subject:", subject);
          console.log("Body Preview:", bodyPreview);
          console.log("Importance:", importance);
          console.log("Sensitivity:", sensitivity);
          console.log("Start DateTime:", start.dateTime);
          console.log("End DateTime:", end.dateTime);

          return {
            title: subject,
            start: new Date(start.dateTime),
            end: new Date(end.dateTime),
            description: bodyPreview,
          };
        });
        setEvents(fetchedEvents);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données de l'API:", error);
      });
  }, []); // Le tableau vide assure que useEffect s'exécute une seule fois au montage du composant
  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };
  return (
    
    <Router>

  <Routes>

  <Route path="/" element={<LandingPage />} />

    <Route path="/calendarr" element={<Calendar apiUrl={apiUrl} />} />
    <Route path='/login' element={<Login />} />
    <Route path='/schedule' element={<ScheduleFreeTimes />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/book' element={<BookUser />} />
    <Route path='/user' element={<FreeTimesPage />} />
    <Route path="/settings" element={<SettingsPage />} />

    <Route
      path='/calendar'
      element={
        <>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            eventStyle={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
          />
          <div className="button-container">
                <button onClick={() => window.location.href = '/settings'}>Create free times</button>
              </div>
        </>
      }
    />
  </Routes>
</Router>

  );
};

export default App;

