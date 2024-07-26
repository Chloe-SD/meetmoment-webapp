// DateRangePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="flex justify-center space-x-10 mt-5">
      <div className="border-2 border-neutral-800 rounded-md py-2 px-5 bg-sky-800">
        <p className='text-purple-50'>Select Start Date:</p>
        <DatePicker
          className='w-full rounded-md p-1'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <p className='text-purple-50'>{startDate.toDateString()}</p>
      </div>
      <div className="border-2 border-neutral-800 rounded-md py-2 px-5 bg-sky-800">
        <p className='text-purple-50'>Select End Date:</p>
        <DatePicker
          className='w-full rounded-md p-1'
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

