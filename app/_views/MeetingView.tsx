// src/screens/MeetingView.tsx
import React, { useState, useEffect } from 'react';
import { Meeting, Day, Participant } from '../_utils/typest';
import TimeBlockSelector from "../components/TimeBlockSelector";
import { useUserAuth } from '../_utils/auth-context';
import { UpdateMeeting } from '../_utils/databaseMgr';

interface MeetingViewProps {
  meeting: Meeting;
  onClose: () => void;
}

const MeetingView: React.FC<MeetingViewProps> = ({ meeting, onClose }) => {
  const { user } = useUserAuth();
  const [localDays, setLocalDays] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userDays = meeting.days;

      const initializedDays = userDays.map(day => ({
        ...day,
        blocks: day.blocks.map(block => ({
          ...block,
          selectable: meeting.days.find(d => d.date === day.date)?.blocks.find(b => b.start === block.start)?.available || false,
          available: false // start with all blocks unselected
        }))
      }));

      setLocalDays(initializedDays);
    }
    setIsLoading(false);
  }, [user, meeting]);

  const handleBlockToggle = (dayIndex: number, blockIndex: number) => {
    setLocalDays(prevDays => {
      const newDays = [...prevDays];
      const block = newDays[dayIndex].blocks[blockIndex];
      if (block.selectable) {
        block.available = !block.available;
      }
      return newDays;
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('You must be logged in to submit availability.');
      return;
    }

    try {
      const updatedParticipants: Participant[] = meeting.participants.map(p =>
        p.email === user.email
          ? { ...p, status: 'confirmed' as 'confirmed', participantAvailability: localDays }
          : p
      );

      const updatedMeeting: Meeting = {
        ...meeting,
        participants: updatedParticipants,
      };
      await UpdateMeeting(updatedMeeting);
      alert('Your availability has been submitted.');
      onClose();
    } catch (error) {
      console.error('Error updating meeting:', error);
      alert('Failed to update meeting. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-neutral-800 bg-blue-500 rounded-md flex flex-col h-svh">
        <button onClick={onClose} className='self-end mx-5'>Back to My Requests</button>
        <h2 className="text-2xl font-bold mb-4 self-center">{meeting.title} - Meeting Request</h2>
        <TimeBlockSelector days={localDays} onBlockToggle={handleBlockToggle} />
        <div className="mt-4">
            <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            onClick={handleSubmit}
            >
            Submit Availability
            </button>
            
        </div>
        </div>
  );
};

export default MeetingView;
