// src/screens/MeetingView.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Meeting, Day, Participant } from '../_utils/typest';
import TimeBlockSelector from '../components/TimeBlockSelector';
import { useUserAuth } from '../_utils/auth-context';
import { UpdateMeeting } from '../_utils/databaseMgr';
import { RemoveParticipant } from '../_utils/databaseMgr';

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
      const initializedDays = meeting.days.map(day => ({
        ...day,
        blocks: day.blocks.map(block => ({
          ...block,
          selectable: block.available, // This should be true for blocks the creator made available
          available: false // Start with all blocks unselected for the current user
        }))
      }));
  
      setLocalDays(initializedDays);
    }
    setIsLoading(false);
  }, [user, meeting]);

  const handleBlockToggle = useCallback((dayIndex: number, blockIndex: number) => {
    console.log('Toggle called for day', dayIndex, 'block', blockIndex);
    setLocalDays(prevDays => {
      return prevDays.map((day, dIndex) => {
        if (dIndex === dayIndex) {
          return {
            ...day,
            blocks: day.blocks.map((block, bIndex) => {
              if (bIndex === blockIndex && block.selectable) {
                console.log('Toggling block from', block.available, 'to', !block.available);
                return { ...block, available: !block.available };
              }
              return block;
            })
          };
        }
        return day;
      });
    });
  }, []);

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

  const handleLeaveMeeting = async () => {
    //console.log('Meeting ID:', meeting.id);
    //console.log('User email:', user.email);
    if (window.confirm('Are you sure you want to leave this meeting?')) {
    try {
        await RemoveParticipant(meeting.id, user.email);
        onClose();
    } catch (error) {
        console.error('Error leaving meeting:', error);
    }
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
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 h-svh overflow-auto">
        <button onClick={onClose} 
          className='bg-gradient-to-br from-sky-800 to-green-400
          hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
          text-purple-50 border-2 border-purple-50
          shadow-sm shadow-purple-200 self-end mx-5'>Back to My Requests</button>
        <h2 className="text-2xl font-bold mb-4 self-center">{meeting.title} - Meeting Request</h2>
        <div>
          <TimeBlockSelector 
          key={JSON.stringify(localDays)} 
          days={localDays} 
          onBlockToggle={handleBlockToggle} />
        </div>
        <div className="flex mt-4 justify-center self-center space-x-8 w-1/2">
            <button 
            className='bg-gradient-to-br from-sky-800 to-green-400
            hover:bg-gradient-to-bl rounded-lg px-5 py-1 py-2 my-4
            text-purple-50 border-2 border-purple-50
            shadow-sm shadow-purple-200'
            onClick={handleSubmit}
            >
            Submit Availability
            </button>
            <button className='bg-red-400
                hover:bg-red-500 rounded-lg px-5 py-1 py-2 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'
                onClick={handleLeaveMeeting}>
                     Leave Meeting
                </button>
            
        </div>
        </div>
  );
};

export default MeetingView;
