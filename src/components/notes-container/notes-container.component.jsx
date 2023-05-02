import React, { useContext, useEffect } from "react";
import "./notes-container.styles.scss";
import NoteItem from "../note-item/note-item.component.jsx";
import { UserContext } from "../../contexts/user-context";
import { NotesContext } from "../../contexts/notes-context";
import { getUsersNotes, db, getGeneralNotes } from "../../utilities/firebase.utils";
import { doc, updateDoc } from "firebase/firestore";

const NotesContainer = () => {
  const { currentUser } = useContext(UserContext);
  const { notes, setNotes } = useContext(NotesContext);

  const handleClick = async (key) => {
    let docRef = doc(db, "users", currentUser);
    let update = notes.filter((note, indx) => key !== indx);
    setNotes(update);
    console.log(update);
    await updateDoc(docRef, { notes: update });
  };

  useEffect(() => {

    if (currentUser) {
      getUsersNotes(currentUser).then((userNotes) => {
        setNotes(userNotes);
      });
    } else {
      getGeneralNotes().then(notes => {
        setNotes(notes)
      })
    }
  }, [currentUser, setNotes]);

  return (
    <div className="notes-container">
      {notes.map((note, indx) => (
        <NoteItem message={note} key={indx} id={indx} onChecked={handleClick} />
      ))}
    </div>
  );
};

export default NotesContainer;
