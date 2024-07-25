// DateRangePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="flex space-x-10">
      <div className="border-2 border-neutral-800 rounded-md p-2 bg-sky-800">
        <p className='text-purple-50'>Select Start Date:</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <p className='text-purple-50'>{startDate.toDateString()}</p>
      </div>
      <div className="border-2 border-neutral-800 rounded-md p-2 bg-sky-800">
        <p className='text-purple-50'>Select End Date:</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <p className='text-purple-50'>{endDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default DateRangePicker;

