// MeetingTitleInput.jsx
import React from 'react';
//import './MeetingTitleInput.css'; // We'll create this CSS file

const MeetingTitleInput = ({ title, setTitle }) => (
  <div className="meeting-title-container">
    <h1 className="meeting-title">New Meeting</h1>
    <input
      className="meeting-title-input"
      type="text"
      placeholder="Meeting Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
);

export default MeetingTitleInput;