import React from 'react'
import axios from 'axios'
import { Login } from './Login'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'

const Signup = () => {
    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [confirmPassword,setConfirmPassword] = React.useState('')
    const navigate = useNavigate()
  

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/auth/register",{name,email,password,confirmPassword});
            console.log(response)
            
            if(response.data.success){
                toast.success("Sign In successsful")
                navigate('/')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    

  return (
    <div className='h-100 grid place-items-center mt-24 shadow-2xl ml-200  w-96 bg-newwhite'>
        <div className='text-3xl pt-5 font-semibold text-newgray'>SignUp Form</div>
        <br></br>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div>
                <label htmlFor='name' className='text-2xl '>Name</label>
                <br></br>
                
                <input 
                    type='text' 
                    placeholder='Enter your Name' 
                    required 
                    className='text-1xl border-2 rounded-md border-newblue'
                    onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <div>
                <label htmlFor='email' className='text-2xl'>Email</label>
                <br></br>
                <input 
                    type='email' 
                    placeholder='Enter your Email' 
                    required 
                    className='text-1xl border-2 rounded-md border-newblue'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <div>
                <label htmlFor='password' className='text-2xl'>Password</label>
                <br></br>
                <input 
                    type='password' 
                    placeholder='Enter your Passsword' 
                    required 
                    className='text-1xl border-2 rounded-md border-newblue'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <div>
                <label htmlFor='confirmPassword' className='text-2xl'>Confirm Password</label>
                <br></br>
                <input 
                    type='password' 
                    placeholder='Enter Confirm Password' 
                    required 
                    className='text-1xl border-2 rounded-md border-newblue'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br></br>
                <br></br>
            </div>
            <button type='submit' className='shadow-lg h-8 rounded-xl w-full  bg-newblue text-white'>SignUp</button>
            <br></br>
            
            <p>Already have an account? <Link  to={'/login'} className='text-newblue'>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup