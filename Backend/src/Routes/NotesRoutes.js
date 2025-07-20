import express from "express"
import {getNotes,createNotes,updateNotes,deleteNotes,getNotesbyID} from "../Controllers/NotesControllers.js"

const router = express.Router()

router.get("/",getNotes)
router.get("/:id",getNotesbyID)
router.post("/",createNotes)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)


export default router