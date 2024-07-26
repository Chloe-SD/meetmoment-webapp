// src/screens/Requests.jsx
import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { FetchMeetings } from '../_utils/databaseMgr';

const RequestsScreen = () => {
  const { user } = useUserAuth();
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserMeetings();
    }
  }, [user]);

  const fetchUserMeetings = async () => {
    try {
      const fetchedMeetings = await FetchMeetings(user.email);
      setMeetings(fetchedMeetings);
    } catch (error) {
      alert("Failed to load meetings. Please try again.");
    }
  };

  const handleMeetingClick = (meeting) => {
    setModalVisible(true);
  };

  return (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4 
    bg-blue-500 max-h-svh">
      <h2 className="text-2xl font-bold mb-4 self-center">{user?.displayName}'s Requests</h2>
      <input
          className="w-2/3 p-2 rounded border-2 border-neutral-800 self-center"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex my-4 w-2/3 self-center items-center justify-end space-x-6'>
        <p className='font-semibold text-lg'>Find Meeting by Code: </p>
        <input
          className="p-2 rounded-md border-2 
          border-neutral-800"
          placeholder="Enter Meeting Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="number"
        />
      </div>
      
      <div className='flex flex-col overflow-y-auto w-full'>
        {meetings.map((item) => (
          <div 
            key={item.id} 
            className="bg-sky-800 rounded-md p-4 mb-4 cursor-pointer border-2
            border-purple-50 w-2/3 flex flex-col self-center"
            onClick={() => handleMeetingClick(item)}
          >
            <div>
              <h3 className="text-lg font-bold text-purple-50">{item.title}</h3>
              <p className="text-sm text-purple-50">created by: {item.creatorEmail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsScreen;