// src/screens/Requests.tsx
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { FetchMeetings } from '../_utils/databaseMgr';
import { Meeting } from '../_utils/typest';
import MeetingView from './MeetingView';

const RequestsScreen = () => {
  const { user } = useUserAuth();
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const fetchedMeetings = await FetchMeetings();
      const filteredMeetings = fetchedMeetings.filter(meeting =>
        meeting.participants.some(
          participant =>
            participant.email === user?.email &&
            participant.status === 'pending',
        ),
      );
      setMeetings(filteredMeetings);
    } catch (error) {
      alert('Failed to load meetings. Please try again.');
    }
  };

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };


  const handleCloseMeetingView = () => {
    setSelectedMeeting(null);
  };

  return !selectedMeeting? (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4 self-center
        text-purple-50">{user?.displayName}&apos;s Requests</h2>
        <input
          className="w-2/3 p-2 rounded border-2 border-neutral-800 self-center"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='flex my-4 w-2/3 self-center items-center justify-end space-x-6'>
            {/* <p className='font-semibold text-lg'>Find Meeting by Code: </p>
            <input
            className="p-2 rounded-md border-2 
            border-neutral-800"
            placeholder="Enter Meeting Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="number"
            /> */}
        </div>
        <div className='flex flex-col overflow-y-auto w-full'>
            {meetings.map((item) => (
            <div 
                key={item.id} 
                className="bg-sky-800 rounded-md p-4 mb-4 cursor-pointer border-2
                border-purple-50 w-2/3 flex flex-col self-center"
                onClick={() => handleMeetingClick(item)}
            >
                <div>
                <h3 className="text-lg font-bold text-purple-50">{item.title}</h3>
                <p className="text-sm text-purple-50">created by: {item.creatorEmail}</p>
                </div>
            </div>
            ))}
        </div>
        {meetings.length == 0? (
          <p className='text-purple-50 text-lg self-center'>You have no requests</p>
        ) : null }
    </div>
  )  : (
    <MeetingView meeting={selectedMeeting} onClose={handleCloseMeetingView} />
  );
};

export default RequestsScreen;
