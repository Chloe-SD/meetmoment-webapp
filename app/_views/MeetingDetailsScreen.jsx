// app/_views/MeetingDetailsScreen.jsx
"use client"
import React from 'react';

const MeetingDetailsScreen = ({ meeting, onClose }) => {
  if (!meeting) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border-2 border-neutral-800 bg-blue-500 rounded-md 
    flex flex-col h-svh">
      <button onClick={onClose}
        className='self-end mx-5'>Back to My Meetings</button>
      <h2 className="text-2xl font-bold mb-4 self-center">{meeting.title} - Meeting Details</h2>
      <div className='w-2/3 flex flex-col self-center overflow-y-auto'>
        <p>Created by: {meeting.creatorEmail}</p>
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
      
    </div>
  );
};

export default MeetingDetailsScreen;
