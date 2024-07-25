"use client"
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserAuth } from '../_utils/auth-context';
import { SaveMeetingSchedule } from '../_utils/databaseMgr';
import MeetingTitleInput from '../components/MeetingTitleInput';
import ParticipantInput from '../components/ParticipantInput';
import ParticipantList from '../components/ParticipantList';
import DateRangePicker from '../components/DateRangePicker';
import MeetingSchedule from '../components/MeetingSchedule';

const NewMeetingScreen = () => {
  const { user } = useUserAuth();
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [meeting, setMeeting] = useState(null);

  const addParticipant = (email) => {
    if (email === user?.email) {
      return;
    }
    setParticipants([...participants, { email, status: 'pending' }]);
  };

  const removeParticipant = (email) => {
    setParticipants(participants.filter(p => p.email !== email));
  };

  const createMeeting = () => {
    if (!user) {
      return;
    }
    const currentUserEmail = user.email;
    const newMeeting = {
      id: Date.now().toString(),
      creatorEmail: currentUserEmail,
      participants,
      days: generateDays(startDate, endDate),
      title,
      status: 'pending',
      participantAvailability: {
        [currentUserEmail]: generateDays(startDate, endDate),
      },
    };
    setMeeting(newMeeting);
  };

  const saveMeetingToDB = async () => {
    if (!meeting || !user) return;
    const currentUserEmail = user.email;
    const meetingToSave = {
      id: meeting.id,
      creatorEmail: currentUserEmail,
      participants: [...participants, {email: currentUserEmail, status: 'confirmed'}],
      days: meeting.days,
      title: title,
      status: 'pending',
      participantAvailability: {
        [currentUserEmail]: generateDays(startDate, endDate),
      },
    };

    try {
      await SaveMeetingSchedule(meetingToSave);
      console.log('Meeting saved successfully!');
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  const generateTimeBlocks = (date) => {
    let blocks = [];
    let current = new Date(`${date}T07:00:00`);  // Start at 7 AM
    const endTime = new Date(`${date}T20:00:00`);  // End at 8 PM
  
    while (current < endTime) {
      const start = current.toTimeString().slice(0, 5);
      current.setHours(current.getHours() + 1);
      const end = current.toTimeString().slice(0, 5);
  
      blocks.push({
        start,
        end,
        available: false,
        selectable: true, // All blocks are selectable for the creator
      });
    }
  
    return blocks;
  };
  
  const generateDays = (start, end) => {
    console.log('Start date received:', start.toISOString());
    console.log('End date received:', end.toISOString());

    let days = [];
  
    // Create new Date objects set to midnight in local time
    let current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
    console.log('Adjusted start date:', current.toISOString());
    console.log('Adjusted end date:', endDate.toISOString());

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      console.log('Adding date:', dateStr);
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }

    console.log('Generated days:', days.map(day => day.date));
  
    return days;
  };

  const handleBlockToggle = (dayIndex, blockIndex) => {
    if (!meeting) return;
    const updatedMeeting = { ...meeting };
    const block = updatedMeeting.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setMeeting(updatedMeeting);
  };

  return (
    <div className='h-screen px-10 justify-center items center
    border-2 border-neutral-800 rounded-md bg-sky-800'>
      <MeetingTitleInput title={title} setTitle={setTitle}/>
      <ParticipantList participants={participants} onRemoveParticipant={removeParticipant} />
      <ParticipantInput onAddParticipant={addParticipant} />
      <DateRangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <button onClick={createMeeting}>Create Meeting</button>
      {meeting && (
        <MeetingSchedule meeting={meeting} onBlockToggle={handleBlockToggle} onSaveMeeting={saveMeetingToDB} />
      )}
    </div>
  );
};

export default NewMeetingScreen;

