// app/page.js (main page)
"use client"
import Header from "./components/Header";
import { useUserAuth } from "./_utils/auth-context";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import LoginScreen from "./_views/LoginScreen";
import NewMeetingScreen from "./_views/NewMeetingScreen";
import RequestsScreen from "./_views/RequestsScreen";
import HomeScreen from "./_views/HomeScreen";
import ProfileScreen from "./_views/ProfileScreen";

export default function Home() {
  const { user } = useUserAuth();
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen/>
        case 'newMeeting':
          return <NewMeetingScreen setCurrentView={setCurrentView} />;
        case 'requests':
          return <RequestsScreen />;
        case 'profile':
          return <ProfileScreen />;
        default:
          return <HomeScreen />;
    }
  };

  return (
    <main>
      <Header/>
      <div>
        {!user ? (
          <LoginScreen className="ml-auto mr-auto mt-8 h-auto"/>
        ) : (
          <div>
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <div className="ml-48 p-4 flex-1">
              {renderCurrentView()}
              
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}
