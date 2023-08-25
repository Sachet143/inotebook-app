import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {notes.map((note) => {
            return <Noteitem key={note.id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
