import React, { useEffect, useState, useContext, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebaseApp from "./config";

const auth = getAuth(firebaseApp);
const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);
const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Sign in handlers
const signInWithEmailAndPasswordHandler = async (
  email: string,
  password: string
) => {
  let result, error;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => (result = userCredential))
    .catch((e) => (error = e));

  return { result, error };
};

const signInWithGoogleHandler = async () => {
  let result, error;

  await signInWithPopup(auth, new GoogleAuthProvider())
    .then((userCredential) => (result = userCredential))
    .catch((e) => (error = e));

  return { result, error };
};

// Sign up handler
const signUpWithEmailAndPasswordHandler = async (
  email: string,
  password: string
) => {
  let result, error;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => (result = userCredential))
    .catch((e) => (error = e));

  return { result, error };
};

// Sign out handler
const signOutHandler = async () => {
  let result, error;

  await signOut(auth)
    .then(() => (result = true))
    .catch((e) => (error = e));

  return { result, error };
};

// Reset password handler
const resetPasswordHandler = async (email: string) => {
  let result, error;

  await sendPasswordResetEmail(auth, email)
    .then(() => (result = true))
    .catch((e) => (error = e));

  return { result, error };
};

export {
  useAuthContext,
  AuthContextProvider,
  signInWithEmailAndPasswordHandler,
  signInWithGoogleHandler,
  signUpWithEmailAndPasswordHandler,
  signOutHandler,
  resetPasswordHandler,
};
