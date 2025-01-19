import React from 'react'
import {FaEdit,FaTrash} from "react-icons/fa"

export const NoteCard = ({note,onEdit,deleteNote}) => {
  return (
    <div className='rounded-md border-2 ml-2 border-gray-200  '>
        <h2 className='text-2xl ml-2 font-semibold mb-5 mt-4'>{note.title}</h2>
        <p className='ml-2 text-xl '>{note.description}</p>
        <div className='flex justify-end'>
            <button className='mb-2 mr-4 text-blue-500' onClick={() => onEdit(note)}><FaEdit/></button>
            <button className='ml-4 mb-2 text-red-600 mr-3' onClick={() => deleteNote(note._id)}><FaTrash/></button>
        </div>
    </div>
  )
}
