// app/components/DayColumn.tsx
import React from 'react';
import { TimeBlock } from '../_utils/typest';

interface DayColumnProps {
  date: string;
  blocks: TimeBlock[];
  onBlockToggle?: (blockIndex: number) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({ date, blocks, onBlockToggle }) => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="mx-2 flex flex-col items-center">
      <span className="text-lg font-bold">{dayOfWeek}</span>
      <span className="text-sm text-gray-600">{formattedDate}</span>
      {blocks.map((block, index) => (
        <button
          key={index}
          className={`py-2 px-4 w-24 border rounded-lg my-1 ${
            block.available ? 'bg-green-500 text-white' : 
            block.selectable ? 'bg-white' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={() => block.selectable && onBlockToggle && onBlockToggle(index)}
          disabled={!block.selectable}
        >
          <span className="text-base">{block.start}</span>
        </button>
      ))}
    </div>
  );
};

export default DayColumn;

