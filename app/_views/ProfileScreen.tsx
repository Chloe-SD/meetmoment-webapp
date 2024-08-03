import React, { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { UpdateUserName } from '../_utils/databaseMgr';

const ProfileScreen = () => {
  const {user, setUser} = useUserAuth();
  const [newName, setNewName] = useState(user.displayName || '');

  const handleUpdateName = async () => {
    if (!user) return;
    try {
      await UpdateUserName(user.id, newName);
      //setUser({...user, displayName: newName});
      alert('Name updated successfully');
    } catch (error) {
      alert('An error occurred - Failed to update name.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-Z0-9 _/&-]/g, '');
    setNewName(newValue);
  };

  return (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 h-svh overflow-auto items-center">
    <h2 className="text-2xl font-bold text-purple-50 mb-4 self-center">Profile Screen</h2>
    
    <div className='flex flex-col justify-start mt-10 w-2/3'>
      <p className='text-purple-50 text-md'>Email: {user?.email}</p>
      <input
        className='mt-4 p-2 rounded-md border-2 border-neutral-800 w-72'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder='New Username'
        maxLength={30}
        >
      </input>
      <button onClick={handleUpdateName}>
        Update Username
      </button>
    </div>

    
  </div>
  );
  
};

export default ProfileScreen;