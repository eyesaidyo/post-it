import { createContext, useState } from "react";

export const NotesContext = createContext({
  notes: null,
  setNotes: () => null,
});
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const value = { notes, setNotes };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
