import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate} from "react-router";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const [Loading, setLoading] = useState(false)

const Navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(title)
  console.log(content)

  if(!title.trim() || !content.trim()){
    toast.error("All Fields are Required")
    return
  }

  setLoading(true)
  try {
    await api.post("/notes",{title,content})
    toast.success("Notes Created Successfully!")
    Navigate("/")
  } catch (error) {
    console.log("Error in Creating Notes: ",error)
    if(error.response.status === 429){
      toast.error("Slow Down! you are Creating Notes so Fast!",{
        duration:4000,
        icon:"⚠"
      }) 
    }
    else{
      toast.error("Failed to Create Notes!")

    }
  }
  finally{
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title mb-4 text-2xl">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                  type="text" 
                  placeholder="Note Title" 
                  className="input input-bordered"
                  value={title}
                  onChange={(e)=>settitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea 
                  placeholder="Write your Note Here" 
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e)=>setcontent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" type="submit" disabled={Loading}>
                    {Loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage