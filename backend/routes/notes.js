import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


//ROUTE:1.  fect all notes : POST "api/notes/fetchallnotes": login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

//ROUTE:2.  add a note using : POST "api/notes/addnote" : login required
router.post('/addnote',fetchuser,[
    body('title', 'title is required and at least 3 character long').isLength({min:3}),
    body('description', 'description is required and at least 5 character long').isLength({min:5})
],async (req,res)=>{
    try{
        const {title,description,tag} = req.body;

        // validation, if there is error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }  
        // to save note
        const note = new Notes({
            title,description,tag,user : req.user.id
        })
        const savenote = await note.save();
        res.json(savenote)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
   
})

//ROUTE:3.  update a note using : PUT "api/notes/updatenote" : login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
        //create new note obj
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

     //allow if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//ROUTE:4.  delete a note using : DELETE "api/notes/deletenote" : login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
        //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

    //allow if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success" :"note has been deleted.."});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
export default router;