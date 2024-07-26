import React from 'react';
import { useUserAuth } from '../_utils/auth-context';

const Sidebar = ({ setCurrentView }) => {
    const { user, firebaseSignOut } = useUserAuth();

    function handleSignOut() {
        firebaseSignOut();
    };

    return (
        <div className="flex flex-col w-48 h-auto bg-sky-800 text-purple-50 p-4 fixed
        rounded-md border-2 border-neutral-800 mt-5">
            <p>Welcome, {user.displayName}</p>
            <p className='text-sm'>{user.email}</p>
            <button onClick={() => setCurrentView('home')}>Home</button>
            <button onClick={() => setCurrentView('newMeeting')}>New Meeting</button>
            <button onClick={() => setCurrentView('requests')}>Requests</button>
            <button onClick={() => setCurrentView('profile')}>Profile</button>
            <button onClick={handleSignOut}
            className='mt-60'>Logout</button>
        </div>
    );
};

export default Sidebar;
