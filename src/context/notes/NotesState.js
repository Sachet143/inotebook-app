import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
    
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  // Get all Notes
  const getNotes = async () => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkOGRmZjI0MjE3ZTdjODhmZjNiMWQ3In0sImlhdCI6MTY5MjI1NjExMX0.-cuKjfm621ovcnD4y__x9-F4lHCPo1132NqdlJ9sJ08"
          },
          body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      setNotes(json);
  }

// Add a Note
const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkOGRmZjI0MjE3ZTdjODhmZjNiMWQ3In0sImlhdCI6MTY5MjI1NjExMX0.-cuKjfm621ovcnD4y__x9-F4lHCPo1132NqdlJ9sJ08"
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    let note = {
        title: title,
        description: description,
        tag: tag,
      };
    setNotes(notes.concat(note));
}

// Delete a Note
const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkOGRmZjI0MjE3ZTdjODhmZjNiMWQ3In0sImlhdCI6MTY5MjI1NjExMX0.-cuKjfm621ovcnD4y__x9-F4lHCPo1132NqdlJ9sJ08"
        },
        body: JSON.stringify(), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    // console.log("Deleting the note with id -> " + id);
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes);
}

// Edit a Note
const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkOGRmZjI0MjE3ZTdjODhmZjNiMWQ3In0sImlhdCI6MTY5MjI1NjExMX0.-cuKjfm621ovcnD4y__x9-F4lHCPo1132NqdlJ9sJ08"
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to Edit Client
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);

    
}


  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
