// MeetingSchedule.tsx
import React from 'react';
import { Meeting } from '../_utils/typest';
import TimeBlockSelector from './TimeBlockSelector';

const MeetingSchedule = ({
  meeting,
  onBlockToggle,
  onSaveMeeting,
  shouldDisableSaveButton,
}: {
  meeting: Meeting;
  onBlockToggle: (dayIndex: number, blockIndex: number) => void;
  onSaveMeeting: () => void;
  shouldDisableSaveButton: boolean;
}) => {
  if (!meeting) {
    return null; // or return a loading state
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl my-4">Meeting Created</h2>
      <TimeBlockSelector days={meeting.days} onBlockToggle={onBlockToggle} />
      <button
        className={`w-36 h-12 mt-8 rounded-lg ${shouldDisableSaveButton ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'} flex items-center justify-center mx-auto`}
        disabled={shouldDisableSaveButton}
        onClick={onSaveMeeting}
      >
        <span className="text-white text-lg font-semibold">Save Meeting</span>
      </button>
    </div>
  );
};

export default MeetingSchedule;
