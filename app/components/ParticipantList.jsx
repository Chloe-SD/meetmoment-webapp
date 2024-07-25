// ParticipantList.jsx
import React from 'react';
//import './ParticipantList.css';

const ParticipantList = ({ participants, onRemoveParticipant }) => (
  <ul className="participant-list">
    {participants.map((participant) => (
      <li key={participant.email} className="participant-item">
        <span>{participant.email}</span>
        <button 
          className="remove-button" 
          onClick={() => onRemoveParticipant(participant.email)}
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
);

export default ParticipantList;