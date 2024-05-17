import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/LoginPage';
import HomePage from './components/HomePage';
import AddNewDevice from './components/AddNewDevice';
import DeleteDevice from './components/DeleteDevice';
import Settings from './components/Settings';
import About from './components/About';
import Navbar from './components/Navbar';
import DeviceCards from './components/DeviceCards';
import DeviceCharts from './components/DeviceCharts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.id) {
      fetchDevices(userProfile.id);
    }
  }, [userProfile]);

  const fetchDevices = async (userId) => {
    try {
      const response = await fetch(`https://replica2.vercel.app/api/device_alias/${userId}`);
      const data = await response.json();
      if (data && data.devices) {
        setDevices(data.devices);
        console.log('Devices fetched in App:', data.devices);
      } else {
        console.log('No devices found for user in App:', userId);
      }
    } catch (error) {
      console.error('Error fetching devices in App:', error);
    }
  };

  const handleDeviceAdded = () => {
    if (userProfile && userProfile.id) {
      fetchDevices(userProfile.id);
    }
  };

  const AppLayout = () => (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate replace to="/" />} />
          <Route path="/add-new-device" element={isLoggedIn ? <AddNewDevice userId={userProfile.id} onDeviceAdded={handleDeviceAdded} /> : <Navigate replace to="/" />} />
          <Route path="/delete-device" element={isLoggedIn ? <DeleteDevice /> : <Navigate replace to="/" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings userProfile={userProfile} /> : <Navigate replace to="/" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate replace to="/" />} />
          <Route path="/device-cards" element={isLoggedIn ? <DeviceCards userId={userProfile.id} /> : <Navigate replace to="/" />} />
          <Route path="/device-charts" element={isLoggedIn ? <DeviceCharts userId={userProfile.id} /> : <Navigate replace to="/" />} />
        </Routes>
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile} />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;



/*import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/LoginPage';
import HomePage from './components/HomePage';
import AddNewDevice from './components/AddNewDevice';
import DeleteDevice from './components/DeleteDevice';
import Settings from './components/Settings';
import About from './components/About';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const AppLayout = () => (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate replace to="/" />} />
          <Route path="/add-new-device" element={isLoggedIn ? <AddNewDevice /> : <Navigate replace to="/" />} />
          <Route path="/delete-device" element={isLoggedIn ? <DeleteDevice /> : <Navigate replace to="/" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings userProfile={userProfile} /> : <Navigate replace to="/" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate replace to="/" />} />
        </Routes>
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile} />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;*/