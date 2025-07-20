import express from "express"
import NotesRoutes from "./Routes/NotesRoutes.js"
import {connectDB} from "./Database/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
dotenv.config()

const app = express()

// port set

const port = process.env.PORT || 5001

//middlewares
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json())
app.use(rateLimiter)

app.use((req,res,next)=>{
    console.log(`Request Method is ${req.method} and URL is ${req.url}`)
    next();
})

app.use("/api/notes",NotesRoutes)

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
