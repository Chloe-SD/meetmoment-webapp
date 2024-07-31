// app/components/TimeBlockSelector.tsx
import React from 'react';
import { Day } from '../_utils/typest';
import DayColumn from './DayColumn';

interface TimeBlockSelectorProps {
  days: Day[];
  onBlockToggle: (dayIndex: number, blockIndex: number) => void;
}

const TimeBlockSelector: React.FC<TimeBlockSelectorProps> = ({ days, onBlockToggle }) => {
  return (
    <div className="flex overflow-auto space-x-4 my-4 w-full justify-center items-center">
      {days.map((day, dayIndex) => (
        <DayColumn
          key={day.date}
          date={day.date}
          blocks={day.blocks}
          onBlockToggle={(blockIndex) => onBlockToggle(dayIndex, blockIndex)}
        />
      ))}
    </div>
  );
};

export default TimeBlockSelector;

