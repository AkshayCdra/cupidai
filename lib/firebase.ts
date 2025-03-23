import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app;
let auth;
let db;
let googleProvider;

// Check if Firebase is already initialized to avoid duplicate initialization
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  // If already initialized, use existing app
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
}

// Authentication functions
export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  if (!auth) throw new Error("Firebase authentication is not initialized");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Update the user's profile with display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error("Firebase authentication is not initialized");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider)
    throw new Error("Firebase authentication is not initialized");

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error details:", error);
    throw error;
  }
};

export const signInWithGoogleRedirect = async () => {
  if (!auth || !googleProvider)
    throw new Error("Firebase authentication is not initialized");

  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    throw error;
  }
};

export const getGoogleRedirectResult = async () => {
  if (!auth) throw new Error("Firebase authentication is not initialized");

  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) throw new Error("Firebase authentication is not initialized");

  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  if (!auth) return Promise.resolve(null);

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export { auth, db, googleProvider };
