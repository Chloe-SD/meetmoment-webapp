// app/_utils/databaseMgr.js
import { db } from "./firebase";
import  { collection, 
          getDocs, 
          deleteDoc, 
          addDoc, 
          updateDoc, 
          doc, 
          setDoc, 
          getDoc } from "firebase/firestore";
import { useUserAuth } from "./auth-context"; // guess I don't need this after all?


export const SaveMeetingSchedule = async (schedule) => {
    try {
      const docRef = await addDoc(collection(db, "meetings"), schedule);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  export async function FetchMeetings() {
    try {
      const meetingsSnapshot = await getDocs(collection(db, 'meetings'));
      return meetingsSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled Meeting',
        creatorEmail: doc.data().creatorEmail || 'Unknown',
        participants: doc.data().participants || [],
        days: doc.data().days || [],
        status: doc.data().status || 'pending'
      }));
    } catch (error) {
      console.error("Error fetching meetings:", error);
      throw error;
    }
  }

  export async function DeleteMeeting(id) {
    try {
      await deleteDoc(doc(db, 'meetings', id));
    } catch (error) {
      console.error("Error deleting meeting:", error);
      throw error;
    }
  }

  export async function RemoveParticipant(meetingId, email) {
    try {
      const meetingRef = doc(db, 'meetings', meetingId);
      const meetingDoc = await getDoc(meetingRef);
      if (meetingDoc.exists()) {
        const data = meetingDoc.data();
        const participants = data?.participants || [];
        const updatedParticipants = participants.filter((participant) => participant.email !== email);
        
        await updateDoc(meetingRef, { 
          participants: updatedParticipants
        });
      } else {
        throw new Error('Meeting not found');
      }
    } catch (error) {
      console.error("Error removing participant from meeting:", error);
      throw error;
    }
  }
  
  export async function SaveMeetingToDatabase(meeting) {
    try {
      await addDoc(collection(db, 'meetings'), meeting);
      console.log('Meeting saved successfully!');
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  }
  
  export async function UpdateMeeting(meeting) {
    try {
      await updateDoc(doc(db, 'meetings', meeting.id), meeting);
      console.log('Meeting updated successfully!');
    } catch (error) {
      console.error('Error updating meeting:', error);
      throw error;
    }
  }
  
  export async function CreateUserDocument(user) {
    try {
      await setDoc(doc(db, 'users', user.id), {
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }
  
  export async function UpdateUserName(userId, newName) {
    try {
      await updateDoc(doc(db, 'users', userId), { name: newName });
      console.log('User name updated successfully!');
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  }
  
  export async function FetchUserData(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('User document not found. may be a first time sign in');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }