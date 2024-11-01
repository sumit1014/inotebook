import React, { useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
  return (
    <>
    <div className="col-md-4">
    <div className="card border-dark mb-3">
        <div className="card-header bg-warning">
            <div className="row">
                <div className="col-md-10"><strong>{note.title}</strong></div>
                <div className="col-md-1"> <i className="bi bi-trash-fill mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully","success");}}></i></div>
                <div className="col-md-1"><i className="bi bi-pencil-square" onClick={()=>{updateNote(note)}}></i></div>
            </div>
        </div>
        <div className="card-body">
            <p className="card-text">{note.description}</p>
        </div>
    </div>
    </div>  
    </>
  )
}

export default Noteitem
