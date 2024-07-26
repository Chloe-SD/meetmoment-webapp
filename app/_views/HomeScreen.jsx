// app/_views/HomeScreen.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import MeetingDetailsScreen from './MeetingDetailsScreen';
import { FetchMeetings } from '../_utils/databaseMgr';


const HomeScreen = ({ setCurrentView, setSelectedMeetingId }) => {
  const { user } = useUserAuth();
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserMeetings();
    }
  }, [user]);

  const fetchUserMeetings = async () => {
    try {
      const fetchedMeetings = await FetchMeetings(user.email);
      setMeetings(fetchedMeetings);
    } catch (error) {
      alert("Failed to load meetings. Please try again.");
    }
  };

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleDeselectMeeting = () => {
    setSelectedMeeting(null);
  };

  return (
    <div>
      <div>
        {selectedMeeting ? (
          <div>
            <MeetingDetailsScreen meeting={selectedMeeting} onClose={handleDeselectMeeting} />
          </div>
        ) : (
          <div className="border-2 border-neutral-800 bg-blue-500 rounded-md 
          flex flex-col h-svh">
            <h2 className="text-2xl font-bold mb-4
            my-4 self-center">{user.displayName}'s Meetings</h2>
            {meetings.length === 0 ? (
              <p>No meetings found.</p>
            ) : (
              <div className='flex flex-col overflow-y-auto w-full mb-10'>
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
            )}
            
          </div>
        )}
      </div>


      
    </div>
  );
};

export default HomeScreen;
