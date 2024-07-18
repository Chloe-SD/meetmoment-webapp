// app/_views/MeetingDetailsScreen.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { db } from "../_utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const MeetingDetailsScreen = ({ meetingId }) => {
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    if (!meetingId) return;

    const fetchMeeting = async () => {
      const docRef = doc(db, "meetings", meetingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMeeting(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchMeeting();
  }, [meetingId]);

  if (!meeting) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Meeting Details</h2>
      <p>ID: {meetingId}</p>
      <p>Creator: {meeting.creatorEmail}</p>
      <div>
        <h3 className="text-xl font-bold mb-4">Days</h3>
        {meeting.days.map((day, index) => (
          <div key={index}>
            <p>Date: {day.date}</p>
            <div>
              {day.blocks.map((block, blockIndex) => (
                <div key={blockIndex}>
                  <p>Start: {block.start}</p>
                  <p>Available: {block.available ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingDetailsScreen;

