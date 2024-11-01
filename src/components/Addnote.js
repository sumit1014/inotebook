import React,{useState ,useRef,useContext}from 'react'
import NoteContext from '../context/notes/NoteContext';
const Addnote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        refclose2.current.click();
        props.showAlert("added note successfully","success");
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const refclose2 = useRef(null)
  return (
    <>
    <div className="d-flex justify-content-center addbutton">  
        <button type="button"  className="btn btn-danger w-75 my-5 shadow" data-bs-toggle="modal" data-bs-target="#addModel">
        Click here to add new a note...
        </button>
    </div>

        <div className="modal fade" id="addModel" tabIndex="-1" aria-labelledby="addModelLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addModelLabel">Add notes</h1>
                    <button type="button" className="btn-close" ref={refclose2}data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="container my-1">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title :</label>
                                <input type="text" className="form-control border-2" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description :</label>
                                <input type="text" className="form-control border-2" id="description" name="description" onChange={onChange} minLength={5} value={note.description} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag :</label>
                                <input type="text" className="form-control border-2" id="tag" name="tag" onChange={onChange} value={note.tag} required/>
                            </div>
                            <button type="submit" disabled={note.title.length<5 || note.description.length<5 }className="btn btn-success w-100" onClick={handleClick}>ADD NOTE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Addnote
