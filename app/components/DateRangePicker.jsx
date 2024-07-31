// DateRangePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date is changed
  };

  const maxEndDate = startDate ? new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000) : null;

  return (
    <div className="flex justify-center space-x-10 mt-5">
      <div className="border-2 border-neutral-800 rounded-md py-2 px-5 bg-sky-800">
        <p className='text-purple-50'>Select Start Date:</p>
        <DatePicker
          className='w-full rounded-md p-1'
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()} // Prevent selecting days before today
        />
        {startDate && <p className='text-purple-50'>{startDate.toDateString()}</p>}
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
          minDate={startDate || new Date()} // End date cannot be before start date
          maxDate={maxEndDate} // End date cannot be more than 10 days after start date
        />
        {endDate && <p className='text-purple-50'>{endDate.toDateString()}</p>}
      </div>
    </div>
  );
};

export default DateRangePicker;





