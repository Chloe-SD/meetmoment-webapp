import React from 'react';

interface MeetingTitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const MeetingTitleInput: React.FC<MeetingTitleInputProps> = ({ title, setTitle }) => {

  function validateNotEmpty(string: string): boolean {
    return string !== '';
  }

  return (
    <div className='flex flex-col self-center space-x-4 w-3/4'>
      <div>
        {!validateNotEmpty(title) && (
          <p className="flex text-red-400 justify-start font-lg">
            Meeting title required.
          </p>
        )}
      </div>
      <input
        className="self-center border-2 border-neutral-800 p-2 rounded-md w-full"
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
      />
    </div>
  );
};

export default MeetingTitleInput;
