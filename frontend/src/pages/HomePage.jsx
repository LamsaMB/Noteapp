import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUi'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import Notecard from '../components/Notecard'
import NotesNotFound from '../components/NotesNotFound'



const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [note, setNote] = useState([])
  const [loadind, setLoading] = useState(true)

  

  useEffect (() => {
    
    const fetchNotes = async () => {
      try {

      const res = await api.get("/note")
      console.log(res.data)
      setNote(res.data)
      setIsRateLimited(false)

      } catch (error) {
        if(error.response.status === 429){
          setIsRateLimited(true)
          toast.error("deffal ndank")
        }
        else{
          toast.error("say gneuwoul dh")
        }

      }

      setLoading(false)
      
    }
    fetchNotes()
  }, [])


  return (
    <div className='min-h-screen'>
       < Navbar />

       {isRateLimited && <RateLimitedUI/>}

       <div className='max-w-7xl mx-auto p-4 mt-6'>
             {loadind && <div className='text-center text-primary py-10'>En chargement...</div>}

             {note.length > 0 && !isRateLimited && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                  note.map((note) => (
                    
                      <Notecard key={note._id} note={note} setNote={setNote} />
                    
                  ))
                }

             </div>)}

             {note.length === 0 && !isRateLimited && <NotesNotFound/>}


       </div>

      
    </div>
   
  )
}

export default HomePage