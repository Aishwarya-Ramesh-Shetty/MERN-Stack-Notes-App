import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'


export const Login = () => {

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const navigate = useNavigate()
  const {login} = useAuth()
 

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5000/api/auth/login',{email,password})
      console.log(response)
      if(response.data.success){
        toast.success("Login successful")
        login(response.data.user)
        localStorage.setItem('token',response.data.token)
        navigate("/")
      }

    }
    catch(error){
      console.log(error)

    }
  }

  return (
    <div className='h-90 grid place-items-center mt-24 shadow-2xl ml-200  w-96 bg-newwhite'>
        <div className='text-2xl font-bold text-newgray'>Login Form</div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email' className='text-xl'>Email</label>
                <br></br>
                <input
                  type='email' 
                  placeholder='Enter your email' 
                  required 
                  className='border-2 border-newblue rounded-lg text-xl'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <div>
                <label htmlFor='password' className='text-xl'>Password</label>
                <br></br>
                <input 
                  type='password' 
                  placeholder='Enter your password' 
                  required 
                  className='text-xl border-2 border-newblue rounded-lg'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <button type='submit' className='shadow-lg h-8 rounded-xl w-full  bg-newblue text-white'>Login</button>
            <br></br>
            <br></br>
            <p>Don't have an account? <Link to={'/register'} className='text-newblue'>Register</Link></p>
        </form>
    </div>
  )
}
