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

  // const emailSignUp = async (email, password, name) => {
  //   try {
  //     const { user } = await createUserWithEmailAndPassword(auth, email, password);
  //     await CreateUserDocument({
  //       id: user.uid,
  //       email,
  //       name,
  //     });
  //     setUser({
  //       id: user.uid,
  //       email,
  //       name,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const emailSignIn = async (email, password) => {
  //   try {
  //     const { user } = await signInWithEmailAndPassword(auth, email, password);
  //     const userData = await FetchUserData(user.uid);
  //     setUser(
  //       ...user,
  //       displayName = userData.name
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
 
  const firebaseSignOut = () => {
    return signOut(auth);
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
 
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};

