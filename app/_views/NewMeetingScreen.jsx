import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeBlockSelector from '../components/TimeBlockSelector';

const NewMeetingScreen = () => {
  const [schedule, setSchedule] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const generateTimeBlocks = (date) => {
    let blocks = [];
    let current = new Date(`${date}T07:00:00`); // Start at 7 AM
    const endDateTime = new Date(`${date}T20:00:00`); // End at 8 PM
    while (current <= endDateTime) {
      const startTime = current.toTimeString().split(' ')[0].substring(0, 5);
      blocks.push({
        start: startTime,
        end: '', // End time is not displayed, so we leave it empty
        available: false,
      });
      current = new Date(current.getTime() + 60 * 60000); // 60-minute intervals
    }
    return blocks;
  };

  const generateDays = (startDate, endDate) => {
    let days = [];
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      const dateStr = current.toLocaleDateString('en-CA'); // Use local date string
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const createSchedule = (startDate, endDate) => {
    const newSchedule = {
      id: Date.now().toString(),
      creatorEmail: 'creator@example.com',
      emails: ['user1@example.com', 'user2@example.com'],
      days: generateDays(startDate, endDate),
    };
    setSchedule(newSchedule);
  };

  const handleDateRangeSelected = () => {
    createSchedule(startDate, endDate);
  };

  const handleBlockToggle = (dayIndex, blockIndex) => {
    if (!schedule) return;
    const updatedSchedule = { ...schedule };
    const block = updatedSchedule.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setSchedule(updatedSchedule);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Meeting</h1>
      <div className="mb-4">
        <label className="block mb-2">Select Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="p-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleDateRangeSelected}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Schedule
      </button>
      {schedule && (
        <div>
          <h2 className="text-xl font-bold my-4">Schedule Created</h2>
          <TimeBlockSelector days={schedule.days} onBlockToggle={handleBlockToggle} />
        </div>
      )}
    </div>
  );
};

export default NewMeetingScreen;

