import React from 'react';

const Footer = () => {
  return (
    <div className="sticky top-full
        bg-gradient-to-br from-sky-300 to-neutral-800
        flex items-center space-x-10 justify-between px-8
        border-2 border-blue-50
        shadow-lg rounded-lg p-2">
      <p className='font-bold text-2xl text-purple-50'>MeetMoment web app</p>
      <p className='text-purple-50'>Chloe Nibali - 2024</p>
    </div>
  );
};

export default Footer;
