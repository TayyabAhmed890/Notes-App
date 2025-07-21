import express from "express"
import NotesRoutes from "./Routes/NotesRoutes.js"
import {connectDB} from "./Database/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"

dotenv.config()

const app = express()

// port set

const port = process.env.PORT || 5001
const __dirname = path.resolve()

//middlewares

if(process.env.NODE_ENV !== "production"){   
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}
app.use(express.json())
app.use(rateLimiter)

app.use((req,res,next)=>{
    console.log(`Request Method is ${req.method} and URL is ${req.url}`)
    next();
})

app.use("/api/notes",NotesRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}


app.get("/",(_,res)=>{
    res.send("NotesApp Backend! End Point to Get Data notes/api")
})

// db connection
connectDB().then(()=>{
    // app run
    app.listen(port,()=>{
        console.log(`Server is Start on Port: http://localhost:${port}`)
    })
})
