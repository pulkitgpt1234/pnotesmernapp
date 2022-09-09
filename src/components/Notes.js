import React, { useEffect ,useState,useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { NoteContext } from "../context/NoteContext";
import CreateNote from "./CreateNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const noteContext = useContext(NoteContext);

  const navigate=useNavigate();
  const { notes, getAllNotes,editNote } = noteContext;

  const [note,setNote]=useState({id:"", eTitle:"", eDescription:"", eTag:""});

  const alertContext=useContext(AlertContext);
  const {showAlert}=alertContext;

  const openModalRef = useRef(null);
  const closeRef = useRef(null);

  const editNoteBtnClicked = (currentNote) => {
    openModalRef.current.click();
    setNote({id:currentNote._id,eTitle:currentNote.title, eDescription:currentNote.description,eTag:currentNote.tag});
  };
  
  const onFieldsChange= (event)=>{
    //TODO find
    setNote({...note,[event.target.name]:event.target.value});
}

const updateBtnClicked=(event)=>{
  editNote(note.eTitle,note.eDescription,note.eTag,note.id);
  closeRef.current.click();
  showAlert("Note Updated Successfully","success");
}
  
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/login');
      showAlert("please login first","warning");
    }
    else
      getAllNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <CreateNote />

      <button
        ref={openModalRef}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch The editNote
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit the Note Here
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{border:"0px"}}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text" value={note.eTitle}
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    onChange={onFieldsChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text" value={note.eDescription}
                    className="form-control"
                    id="eDescription"
                    name="eDescription"
                    onChange={onFieldsChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text" value={note.eTag}
                    className="form-control"
                    id="eTag"
                    name="eTag"
                    onChange={onFieldsChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={updateBtnClicked} disabled={note.eTitle.length<=5||note.eDescription.length<=5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        {notes.map((note) => {
          return <NoteItem key={note._id} editNote={editNoteBtnClicked} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
