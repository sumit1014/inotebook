import React, { useContext,useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(NoteContext);
    const {notes,getNotes,editNote} = context;
    let navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate("/login")
        }
        
        // eslint-disable-next-line 
    },[]);
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})

    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag,)
        refclose.current.click();
        props.showAlert("updated successfully","success");
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag,})
    }

    const ref = useRef(null)
    const refclose = useRef(null)

  return (
    <>
    <Addnote showAlert = {props.showAlert}/>
  
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title :</label>
                    <input type="text" className="form-control border-2" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description :</label>
                    <input type="text" className="form-control border-2" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag :</label>
                    <input type="text" className="form-control border-2" id="etag" value={note.etag}name="etag" onChange={onChange} required/>
                </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}> Update note</button>
        </div>
        </div>
    </div>
    </div>

    <div className="row g-3">
        <h3>your notes</h3>
        <div className="container">
        {(notes.length===0) && 'Notes are not available..'}
        </div>
        {notes.map((note)=>{
            return <Noteitem key={note._id} showAlert = {props.showAlert} updateNote={updateNote}note={note}/>;
        })}
    </div>
    </>
  )
}

export default Notes
