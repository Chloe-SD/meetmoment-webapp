// MeetingSchedule.jsx
import React from 'react';
import TimeBlockSelector from './TimeBlockSelector';
import { useUserAuth } from '../_utils/auth-context';

const MeetingSchedule = ({ meeting, onBlockToggle, onSaveMeeting }) => {
  const { user } = useUserAuth();
  const isCreator = user?.email === meeting.creatorEmail;

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col justify-center items-center overflow-x-auto
      border-2 border-neutral-800 rounded-md'>
        <TimeBlockSelector 
          days={meeting.days} 
          onBlockToggle={onBlockToggle}
        />
      </div>
      <button 
          className='self-center w-1/2 mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
          onClick={onSaveMeeting}>
          {isCreator ? "Save Meeting" : "Submit Availability"}
      </button>
    </div>
  );
};

export default MeetingSchedule;