import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from "../middleware/middleware.js"

import { Router } from 'express'

const router = express.Router()


router.post('/register',async(req,res)=>{
    try{
        const {name,email,password,confirmPassword} = req.body;
        const user = await User.findOne({email})

        if(user){
            return res.status(409).json({success:false,message:"User Already Exists"})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,email,password : hashPassword
        })

        await newUser.save()
        return res.status(200).json({success:true,message:"Accout Created Successfully"})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,message:"Error in adding User"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({success:false ,message:"User not found" })
        }

        const checkpassword = await bcrypt.compare(password,user.password)
        if(!checkpassword){
            return res.status(401).json({success:false,message:"Incorrect Password"})
        }

        const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", { expiresIn: "5h" });

        return res.status(200).json({success:true,token,user:{name:user.name},message:"Login Successfull"})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,message:"Login Unsuccessfull"})

    }
})


router.get('/verify',middleware, async(req,res) =>{
    return res.status(200).json({success:true, user:req.user ,message:"User Verified"})
})


export default router;