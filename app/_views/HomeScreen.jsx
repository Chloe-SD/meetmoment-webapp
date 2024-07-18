// app/_views/HomeScreen.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { db } from "../_utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MeetingDetailsScreen from './MeetingDetailsScreen';


const HomeScreen = ({ setCurrentView, setSelectedMeetingId }) => {
  const { user } = useUserAuth();
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMeetings = async () => {
      const meetingsRef = collection(db, 'meetings');
      const q = query(meetingsRef, where("creatorEmail", "==", user.email));
      const querySnapshot = await getDocs(q);
      const fetchedMeetings = [];
      querySnapshot.forEach((doc) => {
        fetchedMeetings.push({ id: doc.id, ...doc.data() });
      });
      setMeetings(fetchedMeetings);
    };

    fetchMeetings();
  }, [user?.email]);

  const handleMeetingClick = (id) => {
    setSelectedMeeting(id);
  };

  const handleDeselectMeeting = () => {
    setSelectedMeeting(null);
  };

  return (
    <div className="container">
      <div>
        {selectedMeeting ? (
          <div>
            <button onClick={handleDeselectMeeting}>back</button>
            <MeetingDetailsScreen meetingId={selectedMeeting} />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Meetings</h2>
            {meetings.length === 0 ? (
              <p>No meetings found.</p>
            ) : (
              <ul>
                {meetings.map((meeting) => (
                  <li key={meeting.id} onClick={() => handleMeetingClick(meeting.id)} 
                  className="cursor-pointer border border-purple-50 p-2">
                    <p>ID: {meeting.id}</p>
                    <p>Creator: {meeting.creatorEmail}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>


      
    </div>
  );
};

export default HomeScreen;
