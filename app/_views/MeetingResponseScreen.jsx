// app/_views/MeetingResponseScreen.jsx
"use client"
import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { UpdateMeeting } from '../_utils/databaseMgr';
import MeetingSchedule from '../components/MeetingSchedule';

const MeetingResponseScreen = ({ meeting, onClose }) => {
    const { user } = useUserAuth();
    const [localMeeting, setLocalMeeting] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && meeting) {
            const isCreator = meeting.creatorEmail === user.email;
            const userAvailability = meeting.participantAvailability?.[user.email] || [];
            
            const initializedDays = meeting.days.map(day => ({
                ...day,
                blocks: day.blocks.map(block => ({
                    ...block,
                    selectable: block.available, // Only blocks the creator selected are selectable
                    available: isCreator ? block.available : userAvailability.find(d => d.date === day.date)?.blocks.find(b => b.start === block.start)?.available || false
                }))
            }));

            setLocalMeeting({
                ...meeting,
                days: initializedDays
            });
            setIsLoading(false);
        }
    }, [user, meeting]);

    const handleBlockToggle = (dayIndex, blockIndex) => {
        setLocalMeeting(prevMeeting => {
            const newDays = prevMeeting.days.map((day, dIndex) => {
                if (dIndex !== dayIndex) return day;
                return {
                    ...day,
                    blocks: day.blocks.map((block, bIndex) => {
                        if (bIndex !== blockIndex) return block;
                        return {
                            ...block,
                            available: block.selectable ? !block.available : block.available
                        };
                    })
                };
            });
            return { ...prevMeeting, days: newDays };
        });
    };

    const handleSubmit = async () => {
        if (!user) {
            alert('Error: You must be logged in to submit availability.');
            return;
        }

        try {
            const updatedMeeting = {
                ...localMeeting,
                participantAvailability: {
                    ...localMeeting.participantAvailability,
                    [user.email]: localMeeting.days,
                },
                participants: localMeeting.participants.map(p =>
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
            <div className="border-2 border-neutral-800 bg-blue-500 rounded-md flex flex-col h-svh">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="border-2 border-neutral-800 bg-blue-500 rounded-md flex flex-col h-svh">
            <button onClick={onClose} className='self-end mx-5'>Back to My Requests</button>
            <h2 className="text-2xl font-bold mb-4 self-center">{localMeeting.title} - Meeting Request</h2>
            <div className='w-2/3 flex flex-col self-center overflow-y-auto'>
                <p>Meeting Created by: {localMeeting.creatorEmail}</p>
                <p>Meeting Code: {localMeeting.id}</p>
                <MeetingSchedule 
                    meeting={localMeeting}
                    onBlockToggle={handleBlockToggle}
                    onSaveMeeting={handleSubmit}
                />
            </div>
        </div>
    );
};

export default MeetingResponseScreen;