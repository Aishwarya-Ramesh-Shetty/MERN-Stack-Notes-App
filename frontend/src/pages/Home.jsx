import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import NoteModel from '../components/NoteModel'
import axios from 'axios'
import note from '../../../server/models/Note.js'
import { NoteCard } from '../components/NoteCard'
import { toast } from 'react-toastify'

export const Home = () => {
  const [isModelOpen,setModelOpen] = React.useState(false)
  const [filteredNotes,setFilteredNotes] = React.useState(false)
  const [notes,setNotes] = React.useState([])
  const [currentNote,setCurrentNote] = React.useState(null)
  const [query,setQuery] = React.useState(" ")

  useEffect(() =>{
    
    fetchNotes()
  },[])

  useEffect(() =>{
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    )
  },[query,notes])
  
  const fetchNotes = async() =>{
    try{
      const {data} = await axios.get("http://localhost:5000/api/notes",
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setNotes(data.notes)
    }
    catch(error){
      console.log(error.message)
    }
  }

  const editNote = async(id,title,description) =>{
    try{
      const response = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        {title,description},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      if(response.data.success){
        toast.success("Note edited successfully")
        fetchNotes()
        closeModel()
      }

    }catch(error){
      console.log(error)
    }
  }

  const deleteNote = async(id) =>{
    try{
      const response = await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      if(response.data.success){
        toast.success("Note deleted successfully")
        fetchNotes()
      }

    }catch(error){
      console.log(error)
    }
  }

  const closeModel = () =>{
    setModelOpen(false)
  }

  const onEdit = (note) =>{
    setCurrentNote(note)
    setModelOpen(true)
  }

  const addNote = async(title,description) =>{
    try{
      const response = await axios.post(
        'http://localhost:5000/api/notes/add',
        {title,description},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }      
      )
      if(response.data.success){   
        toast.success("Note added successfully")
        closeModel()
        fetchNotes()
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen'>
      <Navbar setQuery={setQuery}/>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-3 gap-5'>
        {
          filteredNotes.length > 0 ?
            filteredNotes.map((note) => (
              <NoteCard
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
              />
            )): <p className='text-3xl'>No notes found</p>
        }
      </div>


      <button
        onClick={() => setModelOpen(true)} 
        className='text-black text-4xl bg-newblue text-center p-4 right-4 bottom-4 fixed  font-bold rounded-full '>
        +
      </button>
      {isModelOpen && <NoteModel 
        closeModel={closeModel}
        addNote={addNote}
        editNote={editNote}
        currentNote={currentNote}
      />}
    </div>
  )
}
