import React from 'react';
import { useUserAuth } from '../_utils/auth-context';

const Sidebar = ({ setCurrentView }) => {
    const { user, firebaseSignOut } = useUserAuth();

    function handleSignOut() {
        firebaseSignOut();
    };

    return (
        <div className="flex flex-col w-48 h-auto 
        bg-gradient-to-bl from-sky-800 to-sky-300
        text-purple-50 p-4 fixed
        rounded-md border-2 border-neutral-800 mt-5">
            <p>Welcome, {user.displayName}</p>
            <p className='text-sm'>{user.email}</p>
            <button onClick={() => setCurrentView('home')}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>Home</button>
            <button onClick={() => setCurrentView('newMeeting')}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>New Meeting</button>
            <button onClick={() => setCurrentView('requests')}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>Requests</button>
            <button onClick={() => setCurrentView('profile')}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>Profile</button>
            <button onClick={handleSignOut}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 mb-4 mt-60
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>Logout</button>
        </div>
    );
};

export default Sidebar;
