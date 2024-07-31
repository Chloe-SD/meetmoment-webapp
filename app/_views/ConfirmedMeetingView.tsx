import React, { useMemo, useState } from 'react';
import { Meeting, Day, Participant } from '../_utils/typest';
import TimeBlockSelector from '../components/TimeBlockSelector';

interface ConfirmedMeetingViewProps {
  meeting: Meeting;
  onClose: () => void;
}

export default function ConfirmedMeetingView({ meeting, onClose }: ConfirmedMeetingViewProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const allResponded = meeting.participants?.every(p => p.status === 'confirmed') ?? false;
  
  const commonAvailability = useMemo(() => getCommonAvailability(meeting), [meeting]);

  const handleParticipantPress = (participant: Participant) => {
    setSelectedParticipant(participant);
  };

  const closeParticipantModal = () => {
    setSelectedParticipant(null);
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

      <div>
        <h3 className="text-xl font-semibold mb-2 text-purple-50">Participants:</h3>
        <div className="space-y-2">
          {meeting.participants?.map((participant) => (
            <button
              key={participant.email}
              onClick={() => handleParticipantPress(participant)}
              className="w-full text-left px-4 py-2 bg-sky-800 hover:bg-sky-700 text-purple-50 rounded-md"
            >
              {participant.email}: {participant.status}
            </button>
          ))}
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
  const confirmedParticipants = meeting.participants.filter(p => p.status === 'confirmed');
  
  if (confirmedParticipants.length === 0) return [];

  const participantAvailabilities = confirmedParticipants
    .map(p => p.participantAvailability)
    .filter(pa => pa !== undefined && pa.length > 0);

  if (participantAvailabilities.length === 0) return [];

  return participantAvailabilities[0].map((day, dayIndex) => ({
    date: day.date,
    blocks: day.blocks.map((block, blockIndex) => ({
      ...block,
      available: participantAvailabilities.every(
        pa => pa[dayIndex]?.blocks[blockIndex]?.available
      ),
    })),
  }));
}