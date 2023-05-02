import React from "react";
import "./note-item.styles.scss";

function NoteItem(props) {
  return (
    <div
      className="note-card"
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      {props.message}
    </div>
  );
}
export default NoteItem;
