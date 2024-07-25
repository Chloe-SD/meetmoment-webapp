// ParticipantList.jsx
import React from 'react';
//import './ParticipantList.css';

const ParticipantList = ({ participants, onRemoveParticipant }) => (
  <ul className='flex flex-row flex-wrap justify-center items-center'>
    {participants.map((participant) => (
      <li key={participant.email} className='w-3/4 flex flex-row justify-center items-center'>
        <p className='w-3/4 text-lg text-purple-50'>{participant.email}</p>
        <button onClick={() => onRemoveParticipant(participant.email)}
          className='justify-end'>
          Remove
        </button>
      </li>
    ))}
  </ul>
);

export default ParticipantList;