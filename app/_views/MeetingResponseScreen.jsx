// app/_views/MeetingResponseScreen.jsx
"use client"
import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { UpdateMeeting } from '../_utils/databaseMgr';
import TimeBlockSelector from '../components/TimeBlockSelector';
import MeetingSchedule from '../components/MeetingSchedule';

const MeetingResponseScreen = ({ meeting, onClose }) => {
    const { user } = useUserAuth();
    const [localDays, setLocalDays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const isCreator = meeting.creatorEmail === user.email;
            const userDays = isCreator? meeting.days : (meeting.participantAvailability?.[user.email] || meeting.days)
            const initializedDays = userDays.map(day => ({
                ...day,
                blocks: day.blocks.map(block => ({
                    ...block,
                    selectable: meeting.days.find(d => d.date === day.date)?.blocks.find(b => b.start === block.start)?.available || false,
                    available: isCreator ? false : block.available // For creator, start with all blocks unselected
                    }))
                }));
                setLocalDays(initializedDays);
            }
            setIsLoading(false);
        }, [user, meeting]
    );

    const handleBlockToggle = (dayIndex, blockIndex) => {
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
          alert('Error: You must be logged in to submit availability.');
          return;
        }
    
        try {
          const updatedMeeting = {
            ...meeting,
            participantAvailability: {
              ...meeting.participantAvailability,
              [user.email]: localDays,
            },
            participants: meeting.participants.map(p =>
              p.email === user.email ? { ...p, status: 'confirmed' } : p
            ),
        };
        await UpdateMeeting(updatedMeeting);
        alert('Success: Your availability has been submitted.');
        onClose();
        } catch (error) {
            console.error('Error updating meeting:', error);
            alert('Error: Failed to update meeting. Please try again.');
        }
    };



    if (isLoading) {
        return (
        <div className="border-2 border-neutral-800 bg-blue-500 rounded-md 
                                    flex flex-col h-svh">
            <p>Loading...</p>
        </div>
        );
    }

    return (
        <div className="border-2 border-neutral-800 bg-blue-500 rounded-md 
        flex flex-col h-svh">
        <button onClick={onClose}
            className='self-end mx-5'>Back to My Requests</button>
        <h2 className="text-2xl font-bold mb-4 self-center">{meeting.title} - Meeting Request</h2>
        <div className='w-2/3 flex flex-col self-center overflow-y-auto'>
            <p>Meeting Created by: {meeting.creatorEmail}</p>
            <p>Meeting Code: {meeting.id}</p>
            <MeetingSchedule 
                meeting={meeting}
            />
        </div>
        
        </div>
    );
    };

export default MeetingResponseScreen;