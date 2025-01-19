import React, { useEffect } from 'react'
import axios from 'axios'


const NoteModel = ({closeModel,addNote,editNote,currentNote}) => {
  const [title,setTitle] = React.useState('')
  const [description,setDescription] = React.useState('')

  useEffect(() =>{
    if(currentNote){
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
  },[currentNote])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(currentNote){
      editNote(currentNote._id,title,description)
    }else{
      addNote(title,description)

    }
    
  }

  return (
    <div className='bg-white fixed inset-0 flex justify-center items-center bg-opacity-85 shadow-2xl'>
      <div className='text-center '>
        <div className='text-3xl font-medium pt-4 pb-5'>{currentNote ? "Edit Note" : "Add Note"}</div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Note title'
            value={title}
            className='text-xl mb-5 border-2 border-newblue rounded-lg'
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <textarea
            
            placeholder='Note description'
            value={description}
            className='text-xl mb-5 border-2 border-newblue rounded-lg w-56'
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <button 
            type='submit' 
            className='bg-newblue w-32 h-10 text-xl text-center rounded-lg' 
          >
            {currentNote ? "Edit Note" : "Add Note"}
          </button>
        </form>
        <button className='text-xl mt-4 text-red-600' onClick={closeModel}>Cancel</button>
      </div>
    </div>
  )
}

export default NoteModel