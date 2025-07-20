import mongoose from "mongoose"

// create schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true} // createAt UpdateAt
)

// create model

const Note = mongoose.model("Note",noteSchema)

export default Note;
