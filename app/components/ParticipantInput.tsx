import React, { useState } from 'react';

interface ParticipantInputProps {
  onAddParticipant: (email: string) => void;
}

const ParticipantInput: React.FC<ParticipantInputProps> = ({onAddParticipant}) => {
  const [participantEmail, setParticipantEmail] = useState<string>('');

  

  const handleAddParticipant = () => {
    if (participantEmail == ''){return};
    if (validateEmailFormat()) {
      onAddParticipant(participantEmail.trim());
      setParticipantEmail('');
    }
  };

  function validateEmailFormat(): boolean {
    if (participantEmail == ''){return true};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    const matchesArray = participantEmail.match(regex);
    return !!matchesArray;
  }

  return (
    <div className='flex flex-col self-center space-x-4 w-3/4'>
      <div className='flex w-full'>
        <input
          type="email"
          className='p-2 rounded-md border-2 border-neutral-800 w-3/4 m-auto'
          placeholder="Add Participant Email"
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
        />
        <button onClick={handleAddParticipant}
          className={`rounded-lg px-5 py-1 my-4 
            ${!validateEmailFormat() ? 'bg-gray-500 cursor-not-allowed' : 
              'bg-gradient-to-br from-sky-800 to-green-400 hover:bg-gradient-to-bl'} 
              text-purple-50 border-2 border-purple-50 flex justify-center items-center`}
          disabled={!validateEmailFormat()}>ADD</button>
      </div>
      <div>
        {!validateEmailFormat() && (
          <p className="text-red-500 text-sm mb-5 pl-2">
            Must be an email.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipantInput;


