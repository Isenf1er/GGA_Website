import React from 'react';
import './Sidebar.css';

//Edit sidebar so it doesn't move while scrolling out of view

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li className="active">Home</li>
        <li>Add New Device</li>
        <li>Delete Device</li>
        <li>Settings</li>
        <li>About</li>
      </ul>
    </div>
  );
}

export default Sidebar;
