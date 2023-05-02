import { useState, useContext } from "react";
import "./input-area.styles.scss";
//import { NotesContext, UserContext } from "../../App.js";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../utilities/firebase.utils";
import { UserContext } from "../../contexts/user-context";
import { NotesContext } from "../../contexts/notes-context";

function InputArea() {
  const [inputField, setInputField] = useState("");
  const { currentUser } = useContext(UserContext);
  const { setNotes } = useContext(NotesContext);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputField(newValue);
    // console.log()
  };

  const handleClick = async () => {
    if (!currentUser) {
      if (inputField !== '') {
        let docRef = doc(db, 'general-notes', '0')
        let docSnap = await getDoc(docRef)
        let ans = docSnap.data()
        let myGeneralNotes = ans['notes']
        setNotes([...myGeneralNotes, inputField]);
        await updateDoc(docRef, {
          notes: [...myGeneralNotes, inputField]
        });
      } else {
        alert("please leave a note");
      }
      setInputField("");
    }
    else {
      if (inputField !== "") {
        var docRef = doc(db, "users", currentUser);
        let docSnap = await getDoc(docRef);
        let ans = docSnap.data();
        // console.log(ans["notes"]);
        let myNotes = ans["notes"];
        setNotes([...myNotes, inputField]);
        await updateDoc(docRef, {
          notes: [...myNotes, inputField],
        });
      } else {
        alert("please leave a note");
      }
      setInputField("");
    }
  };
  return (
    <div className="text-container">
      <textarea
        value={inputField}
        onChange={handleChange}
        className="text-box"
      ></textarea>
      <button onClick={handleClick}>post it</button>
    </div>
  );
}
export default InputArea;
