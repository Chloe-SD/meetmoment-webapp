// MeetingTitleInput.jsx
import React from 'react';

const MeetingTitleInput = ({ title, setTitle }) => (
  <div className='flex flex-col justify-center w-px-300 items-center'>
    <h1 className='text-lg text-purple-50 mt-4 mb-2'>New Meeting:</h1>
    <input
      className='w-3/4 p-2 rounded-md border-2 border-neutral-800'
      type="text"
      placeholder="Meeting Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
);

export default MeetingTitleInput;