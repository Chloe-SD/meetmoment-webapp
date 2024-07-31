import React from 'react';
import { Participant } from '../_utils/typest';

interface ParticipantListProps {
  participants: Participant[];
  onRemoveParticipant: (email: string) => void;
}

const ParticipantList = ({ participants, onRemoveParticipant }: ParticipantListProps) => {
  const participantListEmpty = (): boolean => {
    return participants.length === 0;
  };

  return (
    <div className='flex flex-col w-full items-center'>
      <ul className='flex flex-col w-3/4 justify-center items-center'>
        {participants.map((participant) => (
          <li key={participant.email} className='w-full flex justify-between items-center p-2 border-b border-gray-300'>
            <p className='text-lg text-purple-50'>{participant.email}</p>
            <button 
              onClick={() => onRemoveParticipant(participant.email)}
              className='bg-red-400
                hover:bg-red-600 rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {participantListEmpty() && (
        <div className='w-full flex justify-center'>
          <p className='text-red-400 text-md'>
            Must add at least one participant.
          </p>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;