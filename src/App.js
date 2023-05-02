import "./App.css";
import { useContext } from "react";
//import { BrowserRouter, Routes, Route, Link } from "rea";

import InputArea from "./components/input-area/input-area.component.jsx";
import NotesContainer from "./components/notes-container/notes-container.component.jsx";
import {
  signInWithGoogle,
  createUserDocFromAuth,
  signOutUser,
} from "./utilities/firebase.utils";
import { UserContext } from "./contexts/user-context";
import { NotesContext } from "./contexts/notes-context";
//import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setNotes } = useContext(NotesContext);
  const signInHandler = async () => {
    const { user } = await signInWithGoogle();

    setCurrentUser(user.uid);
    // console.log(user.uid);
    createUserDocFromAuth(user);
    // console.log(currentUser);
  };
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    setNotes([]);
    // console.log(currentUser);
  };
  return (
    <div className="app">
      {currentUser === null ? (
        <nav>
          <button onClick={signInHandler}>Sign In</button>
        </nav>
      ) : (
        <nav>
          <button onClick={signOutHandler}>Sign Out</button>
        </nav>
      )}
      <InputArea />
      <NotesContainer />
    </div>
  );
}

export default App;
