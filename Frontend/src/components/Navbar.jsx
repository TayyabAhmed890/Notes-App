import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='border-b border-base-content/10 bg-base-300'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-3xl font-mono tracking-tight '>NotesApp</h1>
          <div className='flex items-center gap-4'>
            <Link to={"/create"} className='btn btn-primary'>
              <span>
                <PlusIcon className='size-5' />
              </span>
              New Note</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar