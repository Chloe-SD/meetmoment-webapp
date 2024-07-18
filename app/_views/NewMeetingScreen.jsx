"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeBlockSelector from '../components/TimeBlockSelector';
import { useUserAuth } from '../_utils/auth-context';
import { saveMeetingSchedule } from '../_utils/databaseMgr';

const NewMeetingScreen = () => {
  const { user } = useUserAuth();
  const [schedule, setSchedule] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const userEmail = user.email

  const generateTimeBlocks = (date) => {
    let blocks = [];
    let current = new Date(`${date}T07:00:00`); // Start at 7 AM
    const endDateTime = new Date(`${date}T20:00:00`); // End at 8 PM
    while (current <= endDateTime) {
      const startTime = current.toTimeString().split(' ')[0].substring(0, 5);
      blocks.push({
        start: startTime,
        available: false,
      });
      current = new Date(current.getTime() + 60 * 60000); // 60-minute intervals
    }
    return blocks;
  };

  const generateDays = (startDate, endDate) => {
    // Called by: CreateSchedule() => returns array of days for a NEW meeting
    let days = []; // create an array to hold the days for the meeting
    let current = new Date(startDate); // set a day counter variable to cycle through
    let end = new Date(endDate);
    while (current <= end) { // iterate through until endDate is reached
      current.setDate(current.getDate()+1); // increment the date (It starts as day before)
      const dateStr = current.toLocaleDateString('en-CA'); // Use local date string
      days.push({ // Add the day to the meeting days array
        date: dateStr,
        blocks: generateTimeBlocks(dateStr), // generate the time blocks within each day
      });
    }
    return days;
  };

  const createSchedule = (startDate, endDate) => {
    //Called by: handleCreateNewSchedule() => Calls generateDays() => returns a NEW meeting schedule OBJ
    //let email = {user.email};
    const newSchedule = {
      id: Date.now().toString(),
      creatorEmail: userEmail,
      emails: ['user1@example.com', 'user2@example.com'],
      days: generateDays(startDate, endDate),
    };
    setSchedule(newSchedule);
  };

  const handleCreateNewSchedule = () => {
    // called by the "Create Schedule" button on the UI => calls CreateSchedule()
    createSchedule(startDate, endDate);
  };

  const handleBlockToggle = (dayIndex, blockIndex) => {
    if (!schedule) return;
    const updatedSchedule = { ...schedule };
    const block = updatedSchedule.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setSchedule(updatedSchedule);
  };

  const handleSaveMeeting = async () => {
    if (!schedule) return;

    try {
      const docRef = await saveMeetingSchedule(schedule);
      alert('Meeting saved successfully! Document ID: ' + docRef.id);
    } catch (error) {
      console.error('Error saving meeting: ', error);
      alert('Failed to save meeting.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create A New Meeting</h1>
      <div className='flex flex-wrap items-center'>
        <div className="mb-4 mx-5">
          <label className="block mb-2">Select Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="mb-4 mx-5">
          <label className="block mb-2">Select End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border rounded-md"
          />
        </div>
        <button onClick={handleCreateNewSchedule} className="m-5">
          Create Schedule
        </button>
      </div>
      {schedule && (
        <div>
          <h2 className="text-xl font-bold my-4">Schedule Created by: {schedule.creatorEmail}</h2>
          <TimeBlockSelector days={schedule.days} onBlockToggle={handleBlockToggle} />
          <button onClick={handleSaveMeeting}>Save Meeting</button>
        </div>
      )}
    </div>
  );
};

export default NewMeetingScreen;

