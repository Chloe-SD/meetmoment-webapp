// app/_utils/databaseMgr.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "./auth-context";

export const SaveMeetingSchedule = async (schedule) => {
    try {
      const docRef = await addDoc(collection(db, "meetings"), schedule);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

 