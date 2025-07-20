import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimit from '../components/RateLimit'
import api from '../lib/axios'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import NoteNoteFound from '../components/NoteNoteFound'
import { LoaderIcon } from 'lucide-react'


const HomePage = () => {
  const [IsRateLimit, setIsRateLimit] = useState(false)
  const [Notes, setNotes] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimit(false)
      } catch (error) {
        console.log("Error Fetching Notes")
        if (error.response.status === 429) {
          setIsRateLimit(true)
        }
        else {
          toast.error("Failed to Load Notes!")
        }
      }
      finally {
        setLoading(false)
      }
    };
    getNotes()
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />
      {IsRateLimit && <RateLimit />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {Loading && <div className=" flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>}
      {Notes.length === 0 && !IsRateLimit && <NoteNoteFound/>}

        {Notes.length > 0 && !IsRateLimit && (
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}

          </div>
        )
        }

      </div>
    </div>
  )
}

export default HomePage