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
    <div className='flex justify-center items-center space-x-4 px-5'>
      <input
        className='p-2 rounded-md border-2 border-neutral-800 w-2/3'
        type="email"
        placeholder="Add Participant Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={handleAddParticipant}>
        ADD
      </button>
    </div>
  );
};

export default ParticipantInput;