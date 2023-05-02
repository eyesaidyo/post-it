
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA0hJW-wXBwltzrj5LUp4NtsB_56CTCn8",
  authDomain: "post-it-caf6e.firebaseapp.com",
  projectId: "post-it-caf6e",
  storageBucket: "post-it-caf6e.appspot.com",
  messagingSenderId: "363658504101",
  appId: "1:363658504101:web:67f3b47a5d3cc647eaea4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const notes = [];
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        notes,
      });
    } catch (error) {
      console.log(`error creating user`, error.message);
    }
  }
  return userDocRef;
};
export const signOutUser = async () => {
  await signOut(auth);
};
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
export const getUsersNotes = async (user) => {
  const docReference = doc(db, "users", user);
  const notesSnapshot = await getDoc(docReference)
    .then((res) => res.data())
    .then((res) => res["notes"]);
  //console.log(notesSnapshot);

  return notesSnapshot;
};
export const getGeneralNotes = async () => {
  const docReference = doc(db, 'general-notes', '0')
  const notesSnapshot = await getDoc(docReference)
    .then((res) => res.data())
    .then((res) => res["notes"]);
  //console.log(notesSnapshot);

  return notesSnapshot;
}
