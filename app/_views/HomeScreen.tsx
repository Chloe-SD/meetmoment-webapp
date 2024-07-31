// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { FetchMeetings, DeleteMeeting, RemoveParticipant } from '../_utils/databaseMgr';
import { Meeting } from '../_utils/typest';
import ConfirmedMeetingView from './ConfirmedMeetingView';

const HomeScreen = () => {
  const { user } = useUserAuth();
  const [searchText, setSearchText] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMeetings();
  }, [user]);

  const fetchMeetings = async () => {
    try {
      const fetchedMeetings = await FetchMeetings();
      const filteredMeetings = fetchedMeetings.filter(
        meeting =>
          meeting.participants.some(
            participant =>
              participant.email === user?.email &&
              participant.status === 'confirmed',
          ) ||
          (meeting.creatorEmail === user?.email &&
            meeting.status === 'confirmed'),
      );
      setMeetings(filteredMeetings);
    } catch (error) {
      alert('Error: Failed to load meetings. Please try again.');
    }
  };

  const handleDelete = async (meeting: Meeting) => {
    if (!user?.email) {
      alert("Error: User email is not defined.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete this meeting?");
    if (confirmed) {
      try {
        if (meeting.creatorEmail === user.email) {
          await DeleteMeeting(meeting.id);
          setMeetings(prevMeetings => prevMeetings.filter(m => m.id !== meeting.id));
        } else {
          await RemoveParticipant(meeting.id, user.email);
          setMeetings(prevMeetings => prevMeetings.filter(m => m.id !== meeting.id));
        }
      } catch (error) {
        alert("Error: Failed to delete meeting. Please try again.");
      }
    }
  };


  const handleCloseMeetingView = () => {
    setSelectedMeeting(null);
  };

  const handleSelectMeeting = (meeting: Meeting) => {
    console.log("selected meeting: {meeting.title}");
    setSelectedMeeting(meeting);
  };

  return !selectedMeeting ? (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 h-svh overflow-auto">
        <h2 className="text-2xl font-bold text-purple-50 mb-4 self-center">
          {user.displayName}&apos;s Meetings</h2>
        {/* <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
        /> */}

        {meetings.length === 0 ? (
            <p>No meetings found.</p>
        ) : (
            <div className='flex flex-col overflow-y-auto w-full mb-10'>
                {meetings.map((item) => (
                    <div 
                        key={item.id} 
                        className="bg-sky-800 rounded-md p-4 mb-4 cursor-pointer border-2
                        border-purple-50 w-2/3 flex flex-col self-center"
                        onClick={() => handleSelectMeeting(item)}>
                        <div>
                            <h3 className="text-lg font-bold text-purple-50">{item.title}</h3>
                            <p className="text-sm text-purple-50">created by: {item.creatorEmail}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )  : (
     <ConfirmedMeetingView meeting={selectedMeeting} onClose={handleCloseMeetingView} />
   );
};

export default HomeScreen;
