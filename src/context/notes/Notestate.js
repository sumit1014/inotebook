import NoteContext from "./NoteContext";
import { useState } from 'react'

const NoteState=(props)=>{
  const host = "http://localhost:5000";
   const useInitial = [];
   const [notes,setNotes]=useState(useInitial);

   //get all notes
   const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
     method : 'GET',
     headers : {
       'Content-Type' : 'application/json',
       "auth-token" : localStorage.getItem('token')
     }
   }); //API call
   const json = await response.json()
   setNotes(json)
 }


    //add note
    const addNote = async (title,description,tag)=>{
       //API call
       const response = await fetch(`${host}/api/notes/addnote`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          "auth-token" : localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }


    //update note
    const editNote = async (id,title,description,tag)=>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
          "auth-token" : localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const json = await response.json();
      console.log(json);
    
      let newnotes = JSON.parse(JSON.stringify(notes))
      for(let i=0;i<notes.length;i++){
        const element = notes[i];
        if(element._id===id){
          newnotes[i].title = title;
          newnotes[i].description = description;
          newnotes[i].tag = tag;
          break;
        }
      }
      setNotes(newnotes);
    }


    //delete note
    const deleteNote =async(id)=>{
       //API call
       const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          "auth-token" : localStorage.getItem('token')
        }
      });
      const json = response.json();
      console.log(json);
      const newNote = notes.filter((notes)=>{return notes._id!==id});
      setNotes(newNote);
    }
    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote,getNotes}}>
           { props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;