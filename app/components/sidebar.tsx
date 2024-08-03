// app/components/sidebar.tsx
import React from 'react';
import { useUserAuth } from '../_utils/auth-context';

interface SidebarProps {
    currentView: string;
    setCurrentView: (view: string) => void;
  }

const Sidebar = ({ currentView, setCurrentView }) => {
    const { user, firebaseSignOut } = useUserAuth();

    const buttons = [
        { label: 'Home', view: 'home' },
        { label: 'New Meeting', view: 'newMeeting' },
        { label: 'Requests', view: 'requests' },
        { label: 'Profile', view: 'profile' }
      ];

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
            {buttons.map(button => (
                <button
                key={button.view}
                className={`w-full p-2 my-2 text-left text-white rounded-lg
                    border-2 border-purple-50 shadow-sm shadow-purple-200 
                    ${currentView === button.view ? 'bg-sky-800 cursor-not-allowed' : 'bg-gradient-to-br from-sky-800 to-green-400 hover:bg-gradient-to-bl'}`}
                onClick={() => setCurrentView(button.view)}
                disabled={currentView === button.view}
                >
                {button.label}
                </button>
            ))}
            
            <button onClick={handleSignOut}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 mb-4 mt-60
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200'>Logout</button>
        </div>
    );
};

export default Sidebar;
