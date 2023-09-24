import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-sm-4">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title align-self-center m-0">{note.title}</h5>
              <i
                className="fa-solid fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {updateNote(note)}}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
