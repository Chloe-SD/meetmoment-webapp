import React from 'react';
import { useUserAuth } from '../_utils/auth-context';

const Sidebar = ({ setCurrentView }) => {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    function handleSignOut() {
        firebaseSignOut();
    };

    return (
        <div className="flex flex-col w-48 h-full bg-neutral-800 text-purple-50 p-4 fixed">
            <p>Welcome, {user.displayName}</p>
            <button onClick={() => setCurrentView('home')}>Home</button>
            <button onClick={() => setCurrentView('newMeeting')}>New Meeting</button>
            <button onClick={() => setCurrentView('requests')}>Requests</button>
            <button onClick={() => setCurrentView('profile')}>Profile</button>
            <button onClick={handleSignOut}>Logout</button>
        </div>
    );
};

export default Sidebar;
