import React from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);

  const createUser = (name, email, password, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        sendEmailVerification(result.user).then(() => {
          toast.success("Please Verify Your Email");
        });

        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setLoading(false);
          return result;
        });
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setRegisterLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setLoading(false);
        return auth.currentUser;
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    user,
    setUser,
    updateUserProfile,
    loading,
    setLoading,
    registerLoading,
    setRegisterLoading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
