import React from 'react';
import './HomePage.css';
import DeviceCards from './DeviceCards';
import DeviceCharts from './DeviceCharts';

function HomePage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header>
          <h1>IoT Device Overview</h1>
          <div className="user-info">
            <span>You</span>
          </div>
        </header>
        <DeviceCards />
        <DeviceCharts />
      </div>
    </div>
  );
}

export default HomePage;


/*import React from 'react';
import './HomePage.css';
import Sidebar from './Sidebar';
import DeviceCards from './DeviceCards';
import DeviceCharts from './DeviceCharts';

function HomePage() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <header>
          <h1>IoT Device Overview</h1>
          <div className="user-info">
            <span>You</span>
          </div>
        </header>
        <DeviceCards />
        <DeviceCharts />
      </div>
    </div>
  );
}

export default HomePage;
*/