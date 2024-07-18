import React from 'react';

const DayColumn = ({ date, blocks, onBlockToggle }) => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

  return (
    <div className="mx-2 text-center">
      <div className="font-bold text-lg">{dayOfWeek}</div>
      <div className="text-sm text-gray-600 mb-2">{formattedDate}</div>
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`p-2 w-20 border rounded-lg my-1 cursor-pointer ${
            block.available ? 'bg-green-500 text-white' : 'bg-white'
          }`}
          onClick={() => onBlockToggle && onBlockToggle(index)}
        >
          <div className="text-center">{block.start}</div>
        </div>
      ))}
    </div>
  );
};

export default DayColumn;
