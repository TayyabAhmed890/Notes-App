import Note from "../Models/Note.js"

// CRUD Operations Controllers

export const getNotes = async (_,res) => {
    try {
    const notes = await Note.find().sort({createdAt:1});
    res.status(200).json(notes)        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error in getNotes: ",error)
    }
}

export const createNotes = async (req,res) => {
    try {
    const {title,content} = req.body;
    const newNote = new Note({title,content})   
    await newNote.save()    
    res.status(201).json({message: "Note Created Successfully!"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error in createNotes: ",error)
    }
}

export const updateNotes = async (req,res) => {
    try {
    const {title,content} = req.body;
    const updatenote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
    if(!updatenote) return res.status(404).json({message:"Note Not Found!"})
    res.status(200).json({message: "Note Updated Successfully!"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error in updateNotes: ",error)
    }
}

export const deleteNotes = async (req,res) => {
   try {
    const delnote = await Note.findByIdAndDelete(req.params.id)
    if(!delnote) return res.status(404).json({message:"Note Not Found!"})
    res.status(200).json({message: "Note Deleted Successfully!"})
   } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
    console.error("Error in deleteNotes: ",error)
   }
}

export const getNotesbyID = async (req,res) =>{
    try {
        const findID = await Note.findById(req.params.id)
        if(!findID) return res.status(404).json({message:"Note Not Found!"})
        res.status(200).json({message:"Note Find Successfully!",findID})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        console.error("Error in getbyIdNotes: ",error)
    }
}