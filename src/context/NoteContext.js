import { createContext, useState,useContext } from "react";
import { AlertContext } from "./AlertContext";

export const NoteContext = createContext();

export const NoteProvider = (props) => {
  const url = "http://localhost:5000";

  const alertContext=useContext(AlertContext);
  const {showAlert}=alertContext;

  const [notes, setNotes] = useState([]);
  //fetching all notes of user
  const getAllNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const resJson = await response.json();
    setNotes(resJson);
    // console.log("getAllNotes function triggered");
  };

  //add note
  const addNote = async (title, description, tag) => {
    const response=await fetch(`${url}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const note=await response.json();
    setNotes(notes.concat(note));
  };

  //delete a Note
  const deleteNote = async (id) => {
    await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert("Note Deleted Sucessfully","success");
  };

  //edit a Note
  const editNote = async (title, description, tag, id) => {
    await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes=JSON.parse(JSON.stringify(notes)); // deep copy ban jayegi notes array ki newNotes me. same array ban jayegi NewNotes me
    for(var i=0;i<newNotes.length;i++)
    {
      if(newNotes[i]._id===id)
      {
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, getAllNotes, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
