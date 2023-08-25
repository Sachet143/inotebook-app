import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "64de2a1d333ea158c61b1b0b",
      user: "64d8dff24217e7c88ff3b1d7",
      title: "New title",
      description: "New description",
      tag: "tag1",
      date: "2023-08-17T14:09:33.317Z",
      __v: 0,
    },
    {
      _id: "64e356181948432891838afb",
      user: "64d8dff24217e7c88ff3b1d7",
      title: "Wake up updated2",
      description: "Wake up early in the morning updated2",
      tag: "personal",
      date: "2023-08-21T12:18:32.428Z",
      __v: 0,
    },
    {
      _id: "64e35ea6af72560dcdf4719a",
      user: "64d8dff24217e7c88ff3b1d7",
      title: "Wake up",
      description: "Wake up early in the morning",
      tag: "personal",
      date: "2023-08-21T12:55:02.267Z",
      __v: 0,
    },
    {
      _id: "64e36151ea102cd6de287e8d",
      user: "64d8dff24217e7c88ff3b1d7",
      title: "Another note",
      description: "this is another note",
      tag: "personal",
      date: "2023-08-21T13:06:25.463Z",
      __v: 0,
    },
    {
      _id: "64e368c83c49f0ae6dae8010",
      user: "64d8dff24217e7c88ff3b1d7",
      title: "Dinner",
      description: "Its time for the dinner",
      tag: "personal",
      date: "2023-08-21T13:38:16.878Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
