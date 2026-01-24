// import React, { useEffect, useState } from 'react';
// import AuthContext from './AuthContext';
// import { auth } from './firebase.init';
// import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
// import { GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();

// const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading]= useState(true);
  

//   const register = (email, password)=>{
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password)
//   };

//   const login =(email, password)=>{
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password)
//   };

//   const resetPassword = (email)=>{
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email)
//   };

//   const PopUpLogIn =()=>{
//     setLoading(true);
//     return signInWithPopup(auth, provider)
//   };

//   const logout =()=>{

//     return signOut(auth)
//   };



  
//   useEffect(()=>{

//     const unsubscrib = onAuthStateChanged(auth, (CurrentUser) => {

//           if (CurrentUser) {

//             // console.log(CurrentUser);
//             setUser(CurrentUser);
//             setLoading(false);

//           } else {
//             console.log("User is not Logged In");
//             setUser(null);
//             setLoading(false);
//           }

//           return ()=>{
//             unsubscrib();
//           }
//       });
//     },
//    [user]
//   );


//   const authInfo = {
//     user, loading, register, login, PopUpLogIn, setUser, logout, resetPassword
//   };



//   return (
//     <AuthContext value={authInfo}>{children}</AuthContext>
//   );
// };

// export default AuthProvider;


import { useState, useEffect } from "react";
import AuthContext from "../providers/AuthContext"; // ✅ lowercase
// ✅ THIS LINE FIXES THE ERROR
import { auth } from "./firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const PopUpLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    PopUpLogIn,
    logout,
    resetPassword,
    setUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
