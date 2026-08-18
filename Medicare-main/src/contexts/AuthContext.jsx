import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  facebookProvider 
} from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Ensure network is enabled
          await enableNetwork(db);
          
          // Get additional user data from Firestore with error handling
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};
            
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || userData.name || '',
              role: userData.role || 'patient',
              phone: userData.phone || '',
              avatar: firebaseUser.photoURL || userData.avatar || '',
              isVerified: firebaseUser.emailVerified,
              ...userData
            });
          } catch (firestoreError) {
            console.warn('Failed to fetch user data from Firestore:', firestoreError);
            // Set user with basic Firebase Auth data if Firestore fails
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || '',
              role: 'patient',
              phone: '',
              avatar: firebaseUser.photoURL || '',
              isVerified: firebaseUser.emailVerified
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (userData) => {
    try {
      // Ensure network is enabled
      await enableNetwork(db);
      
      // Create user with email and password
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      // Update display name
      await updateProfile(firebaseUser, {
        displayName: userData.name
      });

      // Save additional user data to Firestore
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          name: userData.name,
          email: userData.email,
          role: userData.role || 'patient',
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth || '',
          gender: userData.gender || '',
          avatar: userData.profilePhoto || '',
          createdAt: new Date().toISOString(),
          isActive: true,
          isVerified: false,
          uid: firebaseUser.uid,
          userRole: userData.role || 'patient' // Additional role field for clarity
        });
      } catch (firestoreError) {
        console.warn('Failed to save user data to Firestore:', firestoreError);
        // Continue with registration even if Firestore fails
      }

      return firebaseUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      return firebaseUser;
    } catch (error) {
      // Handle specific error cases
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No account found with this email address');
        case 'auth/wrong-password':
          throw new Error('Incorrect password');
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled');
        default:
          throw new Error('Login failed. Please try again.');
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Ensure network is enabled
      await enableNetwork(db);
      
      const { user: firebaseUser } = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists in Firestore, if not create profile
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: 'patient',
            avatar: firebaseUser.photoURL,
            createdAt: new Date().toISOString(),
            isActive: true,
            isVerified: firebaseUser.emailVerified
          });
        }
      } catch (firestoreError) {
        console.warn('Failed to check/create user in Firestore:', firestoreError);
      }
      
      return firebaseUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      // Ensure network is enabled
      await enableNetwork(db);
      
      const { user: firebaseUser } = await signInWithPopup(auth, facebookProvider);
      
      // Check if user exists in Firestore, if not create profile
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: 'patient',
            avatar: firebaseUser.photoURL,
            createdAt: new Date().toISOString(),
            isActive: true,
            isVerified: firebaseUser.emailVerified
          });
        }
      } catch (firestoreError) {
        console.warn('Failed to check/create user in Firestore:', firestoreError);
      }
      
      return firebaseUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      // Ensure network is enabled
      await enableNetwork(db);
      
      if (auth.currentUser) {
        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
          photoURL: userData.avatar
        });

        // Update Firestore document
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), userData);
        } catch (firestoreError) {
          console.warn('Failed to update user data in Firestore:', firestoreError);
          throw new Error('Failed to update profile. Please try again.');
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};