import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

export const Navbar = ({setQuery}) => {
    const {user,handleLogout} = useAuth()
  return (
    <div className='bg-white  shadow-lg flex flex-row h-28 pt-8'>
        <div className='text-3xl ml-5 font-semibold float-left'>Note<div className='float-right text-newblue'>App</div></div>
        <input 
            type='text'
            placeholder='Search your Notes here'
            required
            className='h-9 text-center rounded-md ml-80 border-2 text-xl border-newblue mt-2'
            onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex '>
            {!user ?
            (
                <>
                    <span className='text-xl mt-2 ml-40 bg-newblue mb-5 w-32 h-9 border-2 text-center font-medium border-newblue rounded-md '>User Name</span>
                    <Link to={'/login'} className='text-xl mt-2 ml-10 h-9 w-20 text-center bg-yellow-500 mb-5 font-medium border-2 border-yellow-500 rounded-md'>Login</Link>
                    <Link to={'/register'} className='text-xl mt-2 ml-10 h-9 w-20 text-center font-medium bg-newgreen mb-5 border-2 border-newgreen rounded-md'>Register</Link>
                </>
                

            ):(
                <>
                    <span className='text-xl mt-2 ml-40 bg-newblue mb-5 w-32 h-9 border-2 text-center font-medium border-newblue rounded-md '>{user.name}</span>
                    <button className='text-xl mt-2 border-2 border-red-600 bg-red-600 font-medium  ml-10 h-9 w-20 text-center mb-5 rounded-md shadow-lg' onClick={handleLogout}>Logout</button>
                </>
                
            )
            }
            
            

        </div>
        
    </div>
  )
}
