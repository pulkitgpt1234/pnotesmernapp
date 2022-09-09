import React from "react";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";
const NoteItem = (props) => {
    const noteContext=useContext(NoteContext);
    const {deleteNote}=noteContext;

    const { note,editNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <div className="icons">
            <i className="fa-solid fa-pencil mx-2" onClick={()=>{editNote(note)}}></i>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
