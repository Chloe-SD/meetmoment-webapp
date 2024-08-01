import React, { useMemo, useState } from 'react';
import { Meeting, Day, Participant, TimeBlock } from '../_utils/typest';
import TimeBlockSelector from '../components/TimeBlockSelector';
import { DeleteMeeting, RemoveParticipant } from '../_utils/databaseMgr';
import { useUserAuth } from '../_utils/auth-context';

interface ConfirmedMeetingViewProps {
  meeting: Meeting;
  onClose: () => void;
  setMeeting: () => void;
}

export default function ConfirmedMeetingView({ meeting, onClose, setMeeting }: ConfirmedMeetingViewProps) {
    const { user } = useUserAuth();
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const allResponded = meeting.participants?.every(p => p.status === 'confirmed') ?? false;
  
    const commonAvailability = useMemo(() => getCommonAvailability(meeting), [meeting]);

    const handleParticipantPress = (participant: Participant) => {
        setSelectedParticipant(participant);
    };

    const closeParticipantModal = () => {
        setSelectedParticipant(null);
    };

    const handleDeleteClicked = () => {
        if (meeting.creatorEmail == user.email){
            handleDeleteMeeting();
        } else {
            handleLeaveMeeting();
        }
        setMeeting();
    }

    // CREATOR of meeting will be able to delete meeting OR remove ANY participant
    const handleDeleteMeeting = async () => {
        if (window.confirm('Are you sure you want to delete this meeting?')) {
        try {
            await DeleteMeeting(meeting.id);
            onClose();
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
        }
    };
    const handleRemoveParticipant = async (email: string) => {
        if (meeting.participants.length <=2){
            if (window.confirm('A meeting must have at least two participants, would you like to delete this meeting instead?')){
                handleDeleteMeeting();
                return;
            }
        }
        if (window.confirm('Are you sure you want to remove this participant?')) {
        try {
            await RemoveParticipant(meeting.id, email);
            setSelectedParticipant(null); // Close the modal if a participant is removed
        } catch (error) {
            console.error('Error removing participant:', error);
        }
        }
    };
    // Additionally, a participant may remove THEMSELVES from the meeting
    const handleLeaveMeeting = async () => {
        //console.log('Meeting ID:', meeting.id);
        //console.log('User email:', user.email);
        if (window.confirm('Are you sure you want to leave this meeting?')) {
        try {
            await RemoveParticipant(meeting.id, user.email);
            onClose();
        } catch (error) {
            console.error('Error leaving meeting:', error);
        }
        }
    };

    return (
        <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 bg-blue-500 h-svh overflow-auto">
        <button
            onClick={onClose}
            className="bg-gradient-to-br from-sky-800 to-green-400 hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4 text-purple-50 border-2 border-purple-50 shadow-sm shadow-purple-200 self-end"
        >
            Back to Home
        </button>

        <h2 className="text-2xl font-bold mb-4 self-center text-purple-50">{meeting.title || 'Untitled Meeting'}</h2>
        <p className="text-lg mb-4 self-center text-purple-50">
            {allResponded ? 'All participants have responded' : 'Waiting for some participants to respond'}
        </p>

        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-50">Common Availability:</h3>
            <TimeBlockSelector days={commonAvailability} onBlockToggle={() => {}} />
        </div>

        <div className='flex justify-between w-4/5 self-center'>
            <div className='w-3/4'>
                <h3 className="text-xl font-semibold mb-2 text-purple-50">Participants:</h3>
                <div className="space-y-2">
                {meeting.participants?.map((participant) => (
                    <div className='flex justify-between space-x-2 items-center'>
                        {meeting.creatorEmail == user.email? (
                            <div>
                                <button className='bg-red-400 hover:bg-red-500
                                    rounded-xl text-purple-50 border-2 border-purple-50
                                    shadow-sm shadow-purple-200 px-2 py-1'
                                    onClick={() => handleRemoveParticipant(participant.email)}>
                                        X
                                </button>
                            </div>
                        ): null}
                        <button
                            key={participant.email}
                            onClick={() => handleParticipantPress(participant)}
                            className="w-full text-left px-4 py-2 bg-sky-800 hover:bg-sky-700 text-purple-50 rounded-md"
                            >
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>{participant.email}</p> 
                                <p>{participant.status}</p>
                            </div>
                        </button>
                        
                    </div>
                    
                ))}
                </div>
            </div>
            <div className='flex justify-center items-end'>
                <button className='bg-red-400
                hover:bg-red-500 rounded-lg px-5 py-1 mb-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'
                onClick={handleDeleteClicked}>
                    {meeting.creatorEmail == user.email? (<p>Delete Meeting</p>):(<p>Leave Meeting</p>)}
                </button>
            </div>
        </div>
        

        {selectedParticipant && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-blue-500 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
                <h3 className="text-xl font-semibold mb-4 text-purple-50">{selectedParticipant.email}&apos;s Availability</h3>
                <TimeBlockSelector 
                days={selectedParticipant.participantAvailability || []} 
                onBlockToggle={() => {}} 
                />
                <button
                onClick={closeParticipantModal}
                className="mt-4 bg-gradient-to-br from-sky-800 to-green-400 hover:bg-gradient-to-bl rounded-lg px-5 py-1 text-purple-50 border-2 border-purple-50"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
}

function getCommonAvailability(meeting: Meeting): Day[] {
    // Copy the participant list - filtering out anyone who has NOT confirmed their availability
    const confirmedParticipants = meeting.participants.filter(p => p.status === 'confirmed');
    // return nothing is no one is confirmed
    if (confirmedParticipants.length === 0) return [];
    // get the availabilities from each CONFIRMED participant
    const participantAvailabilities = confirmedParticipants
      .map(p => p.participantAvailability)
      .filter(pa => pa !== undefined && pa.length > 0);
    // again return none if no one has availabilities defined
    if (participantAvailabilities.length === 0) return [];
    // Create a brand new Days array. // copying the blocks from the original
    return participantAvailabilities[0].map((day, dayIndex) => ({
      date: day.date,
      blocks: day.blocks.map((block, blockIndex) => ({
        ...block, // unpack eac block object and ONLY set it TRUE if EVER PARTICIPANT
        //also had this block selected as TRUE (available)
        available: participantAvailabilities.every(
          pa => pa[dayIndex]?.blocks[blockIndex]?.available
        ),
        selectable: block.available,
      })),
    }));
  }