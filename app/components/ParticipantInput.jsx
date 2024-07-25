// ParticipantInput.jsx
import React, { useState } from 'react';
//import './ParticipantInput.css';

const ParticipantInput = ({ onAddParticipant }) => {
  const [newEmail, setNewEmail] = useState('');

  const handleAddParticipant = () => {
    if (newEmail && newEmail.includes('@')) {
      onAddParticipant(newEmail.trim());
      setNewEmail('');
    }
  };

  return (
    <div className="participant-input-container">
      <input
        className="participant-input"
        type="email"
        placeholder="Add Participant Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button className="add-button" onClick={handleAddParticipant}>
        ADD
      </button>
    </div>
  );
};

export default ParticipantInput;