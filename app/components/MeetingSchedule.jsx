// MeetingSchedule.jsx
import React from 'react';
import TimeBlockSelector from './TimeBlockSelector';
import { useUserAuth } from '../_utils/auth-context';


const MeetingSchedule = ({ meeting, onBlockToggle, onSaveMeeting }) => {
  const { user } = useUserAuth();
  const isCreator = user?.email === meeting.creatorEmail;

  return (
    <div className="meeting-schedule">
      <h2 className="meeting-schedule-title">Meeting Created</h2>
      <TimeBlockSelector 
        days={meeting.days} 
        onBlockToggle={onBlockToggle}
        isCreator={isCreator}
        creatorDays={meeting.days}
      />
      <button 
        className="save-meeting-button" 
        onClick={onSaveMeeting}
      >
        {isCreator ? "Save Meeting" : "Submit Availability"}
      </button>
    </div>
  );
};

export default MeetingSchedule;