import React from 'react';
import DayColumn from './DayColumn';

const TimeBlockSelector = ({ days, onBlockToggle }) => {
  return (
    <div className="flex overflow-x-auto my-4 space-x-4">
      {days.map((day, index) => (
        <DayColumn
          key={day.date}
          date={day.date}
          blocks={day.blocks}
          onBlockToggle={(blockIndex) => onBlockToggle && onBlockToggle(index, blockIndex)}
        />
      ))}
    </div>
  );
};

export default TimeBlockSelector;
