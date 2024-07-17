import React from 'react';

const DayColumn = ({ date, blocks, onBlockToggle }) => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

  return (
    <div className="m-2 text-center">
      <div className="mb-2">
        <p className="text-lg font-bold">{dayOfWeek}</p>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
      {blocks.map((block, index) => (
        <button
          key={index}
          className={`p-2 w-24 border border-gray-300 rounded-md my-1 bg-white ${
            block.available ? 'bg-green-500' : ''
          } custom-time-block`}
          onClick={() => onBlockToggle && onBlockToggle(index)}
        >
          {block.start}
        </button>
      ))}
    </div>
  );
};

export default DayColumn;
