import React, { useState } from 'react'
import { useContext } from "react";
import { AlertContext } from '../context/AlertContext';
import { NoteContext } from "../context/NoteContext";
const CreateNote = () => {

  const noteContext=useContext(NoteContext);
  //add note function destructured from noteContext.
  const {addNote}=noteContext;
  //note state to create a note.
  const [note,setNote]=useState({title:"",description:"",tag:""});

  //update note state when fields change
  const onFieldsChange= (event)=>{
      //TODO find
      setNote({...note,[event.target.name]:event.target.value});
  }

  const alertContext=useContext(AlertContext);
  const {showAlert}=alertContext;
  
  //add a note using submit button
  const createNote=(event)=>{
    //TODO find
    event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
    showAlert("Note Created Successfully","success");
  }
  return (
    <div className="container my-3">
        <h3>Create Notes</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title" name="title"
              onChange={onFieldsChange} minLength={5} required value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description" name='description'
              onChange={onFieldsChange} minLength={5} required value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag" name='tag'
              onChange={onFieldsChange} value={note.tag}
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={createNote} disabled={note.title.length<=5||note.description.length<=5}>
            Add Note
          </button>
        </form>
      </div>
  )
}

export default CreateNote
