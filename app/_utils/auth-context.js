"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
import { FetchUserData, CreateUserDocument } from "./databaseMgr";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailSignUp = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await CreateUserDocument({
        id: user.uid,
        email: email,
        name: name,
      });
      setUser({
        id: user.uid,
        email: email,
        name: name,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      return error.message;
    }
  };
 
  const firebaseSignOut = () => {
    return signOut(auth);
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let userData = await FetchUserData(currentUser.uid);
        
        if (!userData) {
          // If user document doesn't exist (first GitHub sign-in or new Email sign in), create one
          console.log('User document not found, creating new document');
          userData = {
            id: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || 'New User',
          };
          await CreateUserDocument(userData);
        }
        // set user values to values from the stored document
        console.log('User document found, logging in');
        setUser({
          id: currentUser.uid,
          email: currentUser.email,
          displayName: userData.name,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, emailSignIn, emailSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};

