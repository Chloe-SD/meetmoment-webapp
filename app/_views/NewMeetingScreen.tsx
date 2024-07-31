// app/_views/NewMeetingScreen.tsx
import React, { useState } from 'react';
import { Meeting, Participant, Day, TimeBlock } from '../_utils/typest';
import MeetingTitleInput from '../components/MeetingTitleInput';
import DateRangePicker from '../components/DateRangePicker';
import MeetingSchedule from '../components/MeetingSchedule';
import { useUserAuth } from '../_utils/auth-context';
import { SaveMeetingToDatabase } from '../_utils/databaseMgr';
import ParticipantInput from '../components/ParticipantInput';
import ParticipantList from '../components/ParticipantList';

const NewMeetingScreen = () => {
  const { user } = useUserAuth();
  const [title, setTitle] = useState<string>('');
  const [participantList, setParticipantList] = useState<Participant[]>([]);
  const [startDate, setStartDate] = useState<Date| null>(null);
  const [endDate, setEndDate] = useState<Date| null>(null);
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const addParticipant = (email: string) => {
    if (email === user?.email) {return;}
    if (participantList.some(participant => participant.email === email)){return;}
    setParticipantList([...participantList, { email, status: 'pending', participantAvailability: [] }]);
  };

  const removeParticipant = (email: string) => {
    setParticipantList(participantList.filter(p => p.email !== email));
  };

  const selectTime = () => {
    if (!user) {
      return;
    }
    const currentUserEmail = user.email;
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      creatorEmail: currentUserEmail,
      participants: participantList,
      days: generateDays(startDate, endDate),
      title,
      status: 'pending',
    };

    setMeeting(newMeeting);
  };

  const saveMeetingToDB = async () => {
    if (!meeting || !user) return;

    try {
      await SaveMeetingToDatabase(meeting);
      console.log('Meeting saved successfully!');
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  const generateTimeBlocks = (date: string): TimeBlock[] => {
    let blocks: TimeBlock[] = [];
    let current = new Date(`${date}T07:00:00`); // Start at 7 AM
    const endTime = new Date(`${date}T20:00:00`); // End at 8 PM

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

  const generateDays = (start: Date, end: Date): Day[] => {
    let days: Day[] = [];
    let current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const handleBlockToggle = (dayIndex: number, blockIndex: number) => {
    if (!meeting) return;
    const updatedMeeting = { ...meeting };
    const block = updatedMeeting.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setMeeting(updatedMeeting);
  };

  

  function validateNotEmpty(string: string): boolean {
    return string !== '';
  }


  function validateSelectedTime(): boolean {
    if (!startDate || !endDate) return false;
    // Calculate the difference in time
    const differenceInTime = endDate.getTime() - startDate.getTime();
    // Convert time difference to days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // Check if endDate is after startDate and within the specified range
    return differenceInDays > 0 && differenceInDays <= 10;
  }

  function validateParticipantListNotEmpty(): boolean {
    return participantList.length > 0;
  }

  function shouldDisableSaveButton(): boolean {
    return !validateNotEmpty(title) || !validateParticipantListNotEmpty();
  }

 

  return (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 h-svh overflow-auto">
      <h2 className="text-2xl font-bold text-purple-50 mb-4 self-center">New Meeting</h2>
      
      <MeetingTitleInput title={title} setTitle={setTitle} />
      
      <div className='flex flex-col self-center w-3/4 my-4
      border-2 border-purple-50 rounded-md bg-sky-800'>
        <p className='text-purple-50 text-md m-2'>Meeting Participants</p>
        <ParticipantInput onAddParticipant={addParticipant}/>
        <ParticipantList participants={participantList} onRemoveParticipant={removeParticipant}/>
      </div>
      <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}/>
      <p className='text-purple-50 self-center mt-2'>Meetings are limited to a 10 day range.</p>
      <button
        className={`flex rounded-lg px-10 py-1 my-4 self-center mx-auto
        ${!validateSelectedTime() ? 'bg-gray-500 cursor-not-allowed' : 
        'bg-gradient-to-br from-sky-800 to-green-400 hover:bg-gradient-to-bl'} 
        text-purple-50 border-2 border-purple-50`}
        disabled={!validateSelectedTime()}
        onClick={selectTime}>
          {meeting? (<p>Adjust Days</p>):(<p>Build Schedule</p>)}
      </button>
      <div>
        {meeting && (
          <MeetingSchedule
            shouldDisableSaveButton={shouldDisableSaveButton()}
            meeting={meeting}
            onBlockToggle={handleBlockToggle}
            onSaveMeeting={saveMeetingToDB}
          />
        )}
      </div>
      
    </div>
  );
};

export default NewMeetingScreen;
